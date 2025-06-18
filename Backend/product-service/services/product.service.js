const db = require('../models');
//const { getOrSetCache, invalidateCache } = require("../config/redis");
const { Product, ProductItem, Colour, SizeOption, ProductVariantImage, ProductImage, Brand, ProductCategory } = db;
const { DeleteObjectCommand, S3Client } = require('@aws-sdk/client-s3');
const { NotFoundError, BadRequestError } = require('../utils/errorHandler');

const s3 = new S3Client({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
});

class ProductService {
    static async createProductWithImages(productData, images = []) {
        // return await Product.create(productData);
        const transaction = await db.sequelize.transaction();
        
        try {
            // Create product
            const product = await Product.create(productData, { transaction });
            
            // Upload images if any
            if (images && images.length > 0) {
                const imageRecords = images.map((image, index) => ({
                    product_id: product.product_id,
                    image_url: image.location,
                    image_key: image.key,
                    image_name: image.originalname,
                    is_primary: index === 0 // First image as primary
                }));
                
                await ProductImage.bulkCreate(imageRecords, { transaction });
            }
            await transaction.commit();
            // Return product with images
            return await Product.findByPk(product.product_id, {
                include: [{ model: ProductImage, as: 'images' }]
              });
              
        } catch (error) {
            if (!transaction.finished) {
                await transaction.rollback();
              }
        
              // Step 6: Cleanup uploaded S3 images (if any)
              if (images.length > 0) {
                await Promise.all(
                  images.map((image) =>
                    this.deleteImageFromS3(image.key, process.env.AWS_PRODUCT_BUCKET_NAME)
                  )
                );
              }
        
              // Step 7: Rethrow the error
              throw error;
        }
    }
    
    static async addProductImages(productId, images) {
        const transaction = await db.sequelize.transaction();
        
        try {
            const product = await Product.findByPk(productId, { transaction });
            if (!product) {
                throw new NotFoundError('Product not found');
            }
            
            const imageRecords = images.map(image => ({
                product_id: productId,
                image_url: image.location,
                image_key: image.key,
                image_name: image.originalname,
                is_primary: false
            }));
            
            await ProductImage.bulkCreate(imageRecords, { transaction });
            await transaction.commit();
            
            return await Product.findByPk(productId, {
                include: [{ model: ProductImage, as: 'images' }]
              });
              
        } catch (error) {
            await transaction.rollback();
            
             // Delete uploaded images if transaction fails
             if (images && images.length > 0) {
                await Promise.all(images.map(image => 
                    this.deleteImageFromS3(image.key, process.env.AWS_PRODUCT_BUCKET_NAME)
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
    
    static async getProductById(id) {
        const product = await Product.findByPk(id, {
            include: [
                { model: Brand },
                { model: ProductCategory },
                { model: ProductImage, as: 'images'  },
                { 
                    model: ProductItem,
                    include: [
                      { model: Colour },
                      { model: SizeOption },
                      { model: ProductVariantImage, as: 'variantImages' } // <-- Added alias
                    ]
                  }
            ]
        });
        
        if (!product) {
            throw new NotFoundError('Product not found');
        }
        
        return product;
    }
    

        static async updateProductWithImages(
            productId, 
            updateData, 
            newImages = [], 
            deletedImageIds = []
        ) {
            const transaction = await db.sequelize.transaction();
            
            try { 
                // Find the product with its current images
                const product = await Product.findByPk(productId, {
                    include: [{ model: ProductImage, as: 'images' }],
                    transaction
                });
                
                if (!product) {
                    throw new NotFoundError('Product not found');
                }
                const allowedFields = [
                    'product_name', 'description', 'product_category_id', 
                    'brand_id', 'product_type', 'original_price', 'sale_price',
                    'sku', 'barcode', 'stock_status', 'quantity', 
                    'minimum_stock_limit', 'weight', 'length', 'breadth', 'height',
                    'is_published', 'track_inventory', 'continue_selling_out_of_stock',
                    'is_physical_product'
                ];
        
                const updateFields = {};
                Object.keys(updateData).forEach(key => {
                    if (allowedFields.includes(key)) {
                        updateFields[key] = updateData[key];
                    }
                });
                console.log('Original update data:', updateData);
                console.log('Filtered update fields:', updateFields);

                //  Update product data
                await product.update(updateFields, { transaction });

                //  Handle deleted images
                if (deletedImageIds.length > 0) {
                    // Find images to delete
                    const imagesToDelete = await ProductImage.findAll({
                        where: {
                            image_id: deletedImageIds,
                            product_id: productId
                        },
                        transaction
                    });

                    // Delete from S3
                    await Promise.all(
                        imagesToDelete.map(image => 
                            this.deleteImageFromS3(image.image_key, process.env.AWS_PRODUCT_BUCKET_NAME)
                        )
                    );

                    // Delete from database
                    await ProductImage.destroy({
                        where: {
                            image_id: deletedImageIds,
                            product_id: productId
                        },
                        transaction
                    });
                }

        //  Handle new images
        if (newImages.length > 0) {
            const imageRecords = newImages.map((image, index) => ({
                product_id: productId,
                image_url: image.location,
                image_key: image.key,
                image_name: image.originalname,
                is_primary: false // We'll handle primary image separately
            }));

            await ProductImage.bulkCreate(imageRecords, { transaction });
        }

        // Handle primary image if specified
        if (updateData.primaryImageId) {
            // Reset all images to non-primary first
            await ProductImage.update(
                { is_primary: false },
                {
                    where: { product_id: productId },
                    transaction
                }
            );

            // Set the specified image as primary
            await ProductImage.update(
                { is_primary: true },
                {
                    where: {
                        image_id: updateData.primaryImageId,
                        product_id: productId
                    },
                    transaction
                }
            );
        }

        await transaction.commit();

        // Return the fully updated product with images
        return await Product.findByPk(productId, {
            include: [
                { model: Brand },
                { model: ProductCategory },
                { model: ProductImage, as: 'images' },
                { 
                    model: ProductItem,
                    include: [
                        { model: Colour },
                        { model: SizeOption },
                        { model: ProductVariantImage, as: 'variantImages' }
                    ]
                }
            ]
        });

    } catch (error) {
        await transaction.rollback();
        
        // Cleanup any uploaded images if transaction failed
        if (newImages.length > 0) {
            await Promise.all(
                newImages.map(image => 
                    this.deleteImageFromS3(image.key, process.env.AWS_PRODUCT_BUCKET_NAME)
                )
            );
        }
        
        throw error;
    }
}
    
    static async deleteProduct(id) {
        const product = await Product.findByPk(id, {
            include:  [{ model: ProductImage, as: 'images' }]

        });
        
        if (!product) {
            throw new NotFoundError('Product not found');
        }
        
       // Delete all associated images from S3
       if (product.ProductImages && product.ProductImages.length > 0) {
        await Promise.all(product.ProductImages.map(image => 
            this.deleteImageFromS3(image.image_key, process.env.AWS_PRODUCT_BUCKET_NAME)
        ));
    }
        
        // Soft delete the product
        await product.update({ deleted_at: new Date() });
        return { message: 'Product deleted successfully' };
    }
    
    static async listProducts({ page, limit, filters }) {
        const parsedPage = Number(page) > 0 ? Number(page) : 1;
        const parsedLimit = Number(limit) > 0 ? Number(limit) : 10;
        const offset = (parsedPage - 1) * parsedLimit;
    
        const where = {};
        if (filters) {
            if (filters.category) where.product_category_id = filters.category;
            if (filters.brand) where.brand_id = filters.brand;
            if (filters.is_published !== undefined) {
                where.is_published = filters.is_published === 'true';
            }
            if (filters.product_name) {
                where.product_name = {
                    [db.Sequelize.Op.iLike]: `%${filters.product_name}%`
                };
            }
        }
    
        const { count, rows } = await Product.findAndCountAll({
            where,
            limit: parsedLimit,
            offset,
            include: [
                { model: Brand, attributes: ['brand_id', 'brand_name'] },
                { model: ProductCategory, attributes: ['product_category_id', 'category_name'] },
                { model: ProductImage, as: 'images', limit: 1 }
            ],
            order: [['created_at', 'DESC']]
        });
    
        return {
            total: count,
            page: parsedPage,
            totalPages: Math.ceil(count / parsedLimit),
            products: rows
        };
    }
    
    
    static async togglePublishStatus(id) {
        const product = await Product.findByPk(id);
        if (!product) {
            throw new NotFoundError('Product not found');
        }
        
        await product.update({ is_published: !product.is_published });
        return product;
    }
}

module.exports = ProductService;