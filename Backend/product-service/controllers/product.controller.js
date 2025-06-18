const ProductService = require('../services/product.service');
const  ApiResponse  = require('../utils/apiResponse');
const asyncHandler = require('../utils/asyncHandler');
// const { uploadProductImage } = require('../middlewares/upload');

const createProductWithImages  = asyncHandler(async (req, res) => {
    const productData = {
        product_name: req.body.product_name,
        description: req.body.description,
        product_category_id: req.body.product_category_id,
        brand_id: req.body.brand_id,
        product_type: req.body.product_type,
        original_price: req.body.original_price,
        sale_price: req.body.sale_price,
        sku: req.body.sku,
        barcode: req.body.barcode,
        stock_status: req.body.stock_status,
        quantity: req.body.quantity,
        minimum_stock_limit: req.body.minimum_stock_limit,
        weight: req.body.weight,
        length: req.body.length,
        breadth: req.body.breadth,
        height: req.body.height,
        
        // Handle boolean fields
        is_published: req.body.is_published === true || req.body.is_published === 'true',
        track_inventory: req.body.track_inventory === 'true',
        continue_selling_out_of_stock: req.body.continue_selling_out_of_stock === 'true',
        is_physical_product: req.body.is_physical_product === 'true'
    };

    // Convert empty strings to null for optional fields
    const optionalFields = [
        'description', 'brand_id', 'sale_price', 'sku', 'barcode',
        'quantity', 'minimum_stock_limit', 'weight', 'length',
        'breadth', 'height'
    ];

    optionalFields.forEach(field => {
        if (productData[field] === '') {
            productData[field] = null;
        }
    });

    // Convert numeric fields
    const numericFields = [
        'original_price', 'sale_price', 'quantity',
        'minimum_stock_limit', 'weight', 'length',
        'breadth', 'height'
    ];

    numericFields.forEach(field => {
        const value = productData[field];
        const parsed = parseFloat(value);
        productData[field] =
          value === '' || isNaN(parsed) ? null : parsed;
      });

    // Basic validation
    if (!productData.product_name) {
        throw new BadRequestError('Product name is required');
    }

    if (!productData.product_category_id) {
        throw new BadRequestError('Category is required');
    }

    if (
        productData.original_price === null ||
        isNaN(productData.original_price) ||
        productData.original_price < 0
      ) {
        throw new BadRequestError('Valid original price is required');
      }
      

    const images = req.files || [];
    
    try {
        const result = await ProductService.createProductWithImages(productData, images);
        
        new ApiResponse(res, 201, {
            success: true,
            data: result,
            message: 'Product created successfully with images'
        });
    } catch (error) {
        console.error("PRODUCT CREATION ERROR:", error);
        // Handle specific Sequelize validation errors
        if (error.name === 'SequelizeValidationError') {
            const messages = error.errors.map(err => err.message);
            throw new BadRequestError(messages.join(', '));
        }
        throw error;
    }
});

const addProductImages  = asyncHandler(async (req, res) => {
    const productId = req.params.productId;
    const images = req.files.map(file => ({
        location: file.location,
        key: file.key,
        originalname: file.originalname
    }));
    
    const product = await ProductService.addProductImages(productId, images);
    
    new ApiResponse(res, 200, {
        success: true,
        data:product,
        message: 'Product images uploaded successfully'
    });
});

const getProductById = asyncHandler(async (req, res) => {
    const product = await ProductService.getProductById(req.params.id);
    
    new ApiResponse(res, 200, {
        success: true,
        data:product
    });
});

const updateProductWithImages = asyncHandler(async (req, res) => {
    const productId = req.params.id;
    const productData = req.body;
    const newImages = req.files || [];
    const deletedImageIds = req.body.deletedImageIds ? 
        JSON.parse(req.body.deletedImageIds) : [];

    // Convert boolean fields
    const booleanFields = [
        'is_published', 'track_inventory', 
        'continue_selling_out_of_stock', 'is_physical_product'
    ];
    
    booleanFields.forEach(field => {
        if (productData[field] !== undefined) {
            productData[field] = productData[field] === true || 
                                productData[field] === 'true';
        }
    });

    // Convert numeric fields
    const numericFields = [
        'original_price', 'sale_price', 'quantity',
        'minimum_stock_limit', 'weight', 'length',
        'breadth', 'height'
    ];

    numericFields.forEach(field => {
        if (productData[field] !== undefined) {
            const value = productData[field];
            const parsed = parseFloat(value);
            productData[field] = value === '' || isNaN(parsed) ? null : parsed;
        }
    });

    try {
        const updatedProduct = await ProductService.updateProductWithImages(
            productId,
            productData,
            newImages,
            deletedImageIds
        );
        
        new ApiResponse(res, 200, {
            success: true,
            data: updatedProduct,
            message: 'Product updated successfully with images'
        });
    } catch (error) {
        console.error("PRODUCT UPDATE ERROR:", error);
        if (error.name === 'SequelizeValidationError') {
            const messages = error.errors.map(err => err.message);
            throw new BadRequestError(messages.join(', '));
        }
        throw error;
    }
});

const deleteProduct = asyncHandler(async (req, res) => {
    const result=await ProductService.deleteProduct(req.params.id);
    
    new ApiResponse(res, 200, {
        success: true,
        data: result,
        message: 'Product deleted successfully'
    });
});

const listProducts = asyncHandler(async (req, res) => {
    const { page = 1, limit = 10, ...filters } = req.query;
    const products = await ProductService.listProducts({
        page: parseInt(page),
        limit: parseInt(limit),
        filters
    });
    
    new ApiResponse(res, 200, {
        success: true,
        data:products
    });
});

const togglePublishStatus = asyncHandler(async (req, res) => {
    const product = await ProductService.togglePublishStatus(req.params.id);
    
    new ApiResponse(res, 200, {
        success: true,
        data:product,
        message: `Product ${product.is_published ? 'published' : 'unpublished'} successfully`
    });
});

module.exports = {
    createProductWithImages,
    addProductImages,
    getProductById,
    updateProductWithImages,
    deleteProduct,
    listProducts,
    togglePublishStatus
};