const db = require('../models');
const { Product, ProductImage, Brand, ProductCategory } = db;
const { uploadToCloudinary } = require('../utils/cloudinary');
const { NotFoundError, BadRequestError } = require('../utils/errorHandler');

class ProductService {
    static async createProduct(productData, images) {
        const transaction = await db.sequelize.transaction();
        
        try {
            // Create product
            const product = await Product.create(productData, { transaction });
            
            // Upload images if any
            if (images && images.length > 0) {
                const uploadedImages = await this.uploadProductImages(product.product_id, images);
                await ProductImage.bulkCreate(uploadedImages, { transaction });
            }
            
            await transaction.commit();
            return product;
        } catch (error) {
            await transaction.rollback();
            throw error;
        }
    }
    
    static async uploadProductImages(productId, images) {
        const uploadPromises = images.map(async (image) => {
            const result = await uploadToCloudinary(image.path, 'products');
            return {
                product_id: productId,
                image_url: result.secure_url,
                image_name: image.originalname,
                is_primary: false // Can be set based on logic
            };
        });
        
        return Promise.all(uploadPromises);
    }
    
    static async getProductById(id) {
        const product = await Product.findByPk(id, {
            include: [
                { model: Brand },
                { model: ProductCategory },
                { model: ProductImage },
                { 
                    model: db.ProductItem,
                    include: [
                        { model: db.Colour },
                        { model: db.SizeOption },
                        { model: db.ProductVariantImage }
                    ]
                }
            ]
        });
        
        if (!product) {
            throw new NotFoundError('Product not found');
        }
        
        return product;
    }
    
    static async updateProduct(id, updateData) {
        const product = await Product.findByPk(id);
        if (!product) {
            throw new NotFoundError('Product not found');
        }
        
        await product.update(updateData);
        return product;
    }
    
    static async deleteProduct(id) {
        const product = await Product.findByPk(id);
        if (!product) {
            throw new NotFoundError('Product not found');
        }
        
        // Soft delete
        await product.update({ deleted_at: new Date() });
    }
    
    static async listProducts({ page, limit, filters }) {
        const offset = (page - 1) * limit;
        
        const where = { deleted_at: null };
        if (filters) {
            if (filters.category) where.category = filters.category;
            if (filters.brand) where.brand = filters.brand;
            if (filters.is_published) where.is_published = filters.is_published === 'true';
            if (filters.product_name) where.product_name = { [db.Sequelize.Op.iLike]: `%${filters.product_name}%` };
        }
        
        const { count, rows } = await Product.findAndCountAll({
            where,
            limit,
            offset,
            include: [
                { model: Brand },
                { model: ProductImage, limit: 1 } // Only include first image for listing
            ],
            order: [['created_at', 'DESC']]
        });
        
        return {
            total: count,
            page,
            totalPages: Math.ceil(count / limit),
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