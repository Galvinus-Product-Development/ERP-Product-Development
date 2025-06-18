const db = require('../models');
const { ProductItem, Product, Colour, SizeOption, ProductVariantImage } = db;
const { DeleteObjectCommand, S3Client } = require('@aws-sdk/client-s3');
const { NotFoundError, BadRequestError } = require('../utils/errorHandler');

const s3 = new S3Client({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
});

class VariantService {
    static transformVariantResponse(variant)  {
        const plainVariant  = typeof variant.get === 'function' 
        ? variant.get({ plain: true })
            : variant;
        
        return {
            id: plainVariant.product_item_id,
            product_item_id: plainVariant.product_item_id,
            productId: plainVariant.product_id,
            product_id: plainVariant.product_id,
            colorId: plainVariant.colour_id,
            colour_id: plainVariant.colour_id,
            sizeId: plainVariant.size_id,
            size_id: plainVariant.size_id,
            originalPrice: plainVariant.original_price,
            original_price: plainVariant.original_price,
            discount: plainVariant.discount_applicable,
            discount_applicable: plainVariant.discount_applicable,
            salePrice: plainVariant.sale_price,
            sale_price: plainVariant.sale_price,
            stockQuantity: plainVariant.qty_in_stocks,
            qty_in_stocks: plainVariant.qty_in_stocks,
            variant_sku: plainVariant.variant_sku,
            variant_barcode: plainVariant.variant_barcode,
            weight: plainVariant.weight,
            length: plainVariant.length,
            breadth: plainVariant.breadth,
            height: plainVariant.height,
            // productName: plainVariant.Product?.product_name,
            // productType: plainVariant.Product?.product_type,
            colorName: plainVariant.Colour?.colour_name || plainVariant.colour_name,
            colour_name: plainVariant.Colour?.colour_name || plainVariant.colour_name,
            sizeName: plainVariant.SizeOption?.size_name || plainVariant.size_name,
            size_name: plainVariant.SizeOption?.size_name || plainVariant.size_name,
            images: (plainVariant.ProductVariantImages || plainVariant.variantImages || []).map(img => ({
            id: img.image_id || img.id,
            image_url: img.image_url,
            image_key: img.image_key,
            image_name: img.image_name,
            sort_order: img.sort_order
        })),
            Product: plainVariant.Product,
        };
        
    };
    static async addVariantWithImages(productId, variantData, images = []) {
        console.log('Starting variant creation for product:', productId);
        console.log('Variant data received:', variantData);
        console.log('Number of images:', images.length);
        const transaction = await db.sequelize.transaction();
    
        try {
            // Validate product ID
            if (!productId) {
                throw new BadRequestError('Missing productId in route parameter');
            }
    
            // Check if product exists
            const product = await Product.findByPk(productId, { transaction });
            if (!product) {
                throw new NotFoundError('Product not found');
            }
            console.log('Raw original_price:', variantData.original_price);
            // Validate and parse numeric fields
            const originalPrice = Number(variantData.original_price);
            console.log('Parsed originalPrice:', originalPrice);
            const discount = parseFloat(variantData.discount_applicable || 0);
            const quantity = parseInt(variantData.qty_in_stocks || 0, 10);
            console.log('Parsed values:', { originalPrice, discount, quantity });
    
            // Validate numeric values
            if (isNaN(originalPrice) || originalPrice <= 0) {
                throw new BadRequestError('Original price must be a positive number');
            }
    
            if (isNaN(discount) || discount < 0 || discount > 100) {
                throw new BadRequestError('Discount must be between 0 and 100 percent');
            }
    
            if (isNaN(quantity)) {
                throw new BadRequestError('Quantity must be a valid number');
            }
    
              // Calculate sale price with validation
        let salePrice;
        if (discount > 0) {
            salePrice = originalPrice * (1 - (discount / 100));
        } else {
            salePrice = originalPrice;
        }

        console.log('Sale price calculation:', { originalPrice, discount, salePrice });

        // Validate sale price calculation
        if (isNaN(salePrice) || salePrice < 0) {
            throw new BadRequestError(`Invalid sale price calculation. Original: ${originalPrice}, Discount: ${discount}%, Result: ${salePrice}`);
        }
            // Generate SKU and Barcode
        const variant_sku = this.generateDefaultSKU(product, variantData);
        const variant_barcode = this.generateDefaultBarcode(product, variantData);

        console.log('Generated SKU:', variant_sku);
        console.log('Generated Barcode:', variant_barcode);

            // Create new object instead of mutating input
            const variantPayload = {
                product_id: productId,
                colour_id: variantData.colour_id,
                size_id: variantData.size_id,
                original_price: originalPrice,
                discount_applicable: discount,
                sale_price: salePrice,
                qty_in_stocks: quantity,
                weight: variantData.weight ? parseFloat(variantData.weight) : null,
                length: variantData.length ? parseFloat(variantData.length) : null,
                breadth: variantData.breadth ? parseFloat(variantData.breadth) : null,
                height: variantData.height ? parseFloat(variantData.height) : null,
                variant_sku: variantData.variant_sku || this.generateDefaultSKU(product, variantData),
                variant_barcode: variantData.variant_barcode || this.generateDefaultBarcode(product, variantData)
            };
            console.log('Final variant payload:', variantPayload);
            
    
            // Create variant
            const variant = await ProductItem.create(variantPayload, { transaction });
            console.log('Variant created with ID:', variant.product_item_id);
    
            // Handle images
            if (images?.length > 0) {
                const imageRecords = images.map((image, index) => ({
                    product_item_id: variant.product_item_id,
                    image_url: image.location,
                    image_key: image.key,
                    image_name: image.originalname,
                    sort_order: index
                }));
                await ProductVariantImage.bulkCreate(imageRecords, { transaction });
                console.log('Images created:', imageRecords.length);
            }
    
            await transaction.commit();
            console.log('Transaction committed successfully');
            
            const createdVariant =  await ProductItem.findByPk(variant.product_item_id, {
                include: [
                    { model: Colour },
                    { model: SizeOption },
                    { model: ProductVariantImage, as: 'variantImages' }
                ]
            });
            return createdVariant;
    
        } catch (error) {
            console.error('Variant creation failed:', error);
            if (transaction.finished !== 'commit') {
                await transaction.rollback();
            }
            
            // Cleanup uploaded images if transaction fails
            if (images?.length > 0) {
                await Promise.all(images.map(image => 
                    this.deleteImageFromS3(image.key, process.env.AWS_VARIANT_BUCKET_NAME)
                ));
            }
            
           
            throw error;
        }
    }
    
    // Helper methods for SKU/barcode generation
    static generateDefaultSKU(product, variantData) {
        try {
            const productPrefix = product.sku || product.product_id.toString().slice(0, 3).toUpperCase();
            const colourPart = variantData.colour_id ? variantData.colour_id.slice(0, 3).toUpperCase() : 'CLR';
            const sizePart = variantData.size_id ? variantData.size_id.slice(0, 3).toUpperCase() : 'SZE';
            
            return `${productPrefix}-${colourPart}-${sizePart}`;
        } catch (error) {
            console.error('SKU generation error:', error);
            return `SKU-${Date.now()}`;
        }
    }
    
    static generateDefaultBarcode(product, variantData) {
        try {
            const productPrefix = product.barcode || product.product_id.toString().padStart(4, '0').slice(-4);
            const colourPart = variantData.colour_id ? variantData.colour_id.slice(0, 4) : '0000';
            const sizePart = variantData.size_id ? variantData.size_id.slice(0, 4) : '0000';
            const timestamp = Date.now().toString().slice(-4);
            
            return `${productPrefix}${colourPart}${sizePart}${timestamp}`;
        } catch (error) {
            console.error('Barcode generation error:', error);
            return `${Date.now()}`;
        }
    }
    
    static async addVariantImages(productItemId, images) {
        const transaction = await db.sequelize.transaction();
        
        try {
            const variant = await ProductItem.findByPk(productItemId, { transaction });
            if (!variant) {
                throw new NotFoundError('Variant not found');
            }
            
            const imageRecords = images.map((image, index) => ({
                product_item_id: productItemId,
                image_url: image.location,
                image_key: image.key,
                image_name: image.originalname,
                sort_order: index
            }));
            
            await ProductVariantImage.bulkCreate(imageRecords, { transaction });
            await transaction.commit();
            
            return await ProductItem.findByPk(productItemId, {
                include: [
                    { model: Colour },
                    { model: SizeOption },
                    { model: ProductVariantImage, as: 'variantImages'  }],
                //transaction
            });
        } catch (error) {
            await transaction.rollback();
            
            if (images && images.length > 0) {
                await Promise.all(images.map(image => 
                    this.deleteImageFromS3(image.key, process.env.AWS_VARIANT_BUCKET_NAME)
                ));
            }
            throw error;
        }
    }
    
    static async deleteImageFromS3(key, bucketName) {
        try {
            await s3.send(new DeleteObjectCommand({
                Bucket: bucketName,
                Key: key
            }));
        } catch (error) {
            console.error('Error deleting image from S3:', error);
        }
    }
    
    static async updateVariant(variantId, updateData, images = []) {
        const transaction = await db.sequelize.transaction();
        
        try {
          // 1. Update variant data
          const variant = await ProductItem.findByPk(variantId, { transaction });
          if (!variant) throw new NotFoundError('Variant not found');
      
          // Recalculate sale price if needed
          if (updateData.discount_applicable || updateData.original_price) {
            const discount = updateData.discount_applicable ?? variant.discount_applicable;
            const originalPrice = updateData.original_price ?? variant.original_price;
            updateData.sale_price = originalPrice * (1 - (discount / 100));
          }
      
          await variant.update(updateData, { transaction });
      
          // 2. Handle images if provided
          if (images?.length > 0) {
            const imageRecords = images.map((image, index) => ({
              product_item_id: variantId,
              image_url: image.location,
              image_key: image.key,
              image_name: image.originalname,
              sort_order: index
            }));
            await ProductVariantImage.bulkCreate(imageRecords, { transaction });
          }
      
          await transaction.commit();
      
          // Return full updated variant
          return await ProductItem.findByPk(variantId, {
            include: [
              { model: Colour },
              { model: SizeOption },
              { model: ProductVariantImage, as: 'variantImages' }
            ]
          });
        } catch (error) {
          await transaction.rollback();
          if (images?.length > 0) {
            await Promise.all(images.map(image => 
              this.deleteImageFromS3(image.key, process.env.AWS_VARIANT_BUCKET_NAME)
            ));
          }
          throw error;
        }
    }
    
        static async deleteVariantImage(imageId) {
            const transaction = await db.sequelize.transaction();
            
            try {
            // Find the image record
            const image = await ProductVariantImage.findByPk(imageId, { transaction });
            if (!image) {
                throw new NotFoundError('Image not found');
            }
        
            // Delete from S3 first
            await this.deleteImageFromS3(image.image_key, process.env.AWS_VARIANT_BUCKET_NAME);
        
            // Then delete the database record
            await image.destroy({ transaction });
        
            await transaction.commit();
            
            return { success: true, message: 'Image deleted successfully' };
            } catch (error) {
            await transaction.rollback();
            console.error('Error deleting variant image:', error);
            throw error;
            }
        }
    
    static async deleteVariant(variantId) {
        const variant = await ProductItem.findByPk(variantId, {
            include: [ProductVariantImage]
        });
        if (!variant) {
            throw new NotFoundError('Variant not found');
        }
          
        // Delete all associated images from S3
        if (variant.ProductVariantImages && variant.ProductVariantImages.length > 0) {
            await Promise.all(variant.ProductVariantImages.map(image => 
                this.deleteImageFromS3(image.image_key, process.env.AWS_VARIANT_BUCKET_NAME)
            ));
        }
        
        await variant.destroy();
    }
    
    static async getProductVariants(productId) {
        const variants = await ProductItem.findAll({
            where: { product_id: productId },
            include: [
                { model: Colour },
                { model: SizeOption },
                { model: ProductVariantImage, as: 'variantImages'  },
                { 
                    model: Product,
                    attributes: ['product_id', 'product_name', 'description', 'product_type'] 
                }
            ],
            order: [['created_at', 'ASC']]
        });
    
        // Transform the data to make it more frontend-friendly
        return variants.map(variant => this.transformVariantResponse(variant));

    }
    
    
}

module.exports = VariantService;