const { body, param } = require('express-validator');
const { Product } = require('../models');

const createProductValidator = [
    body('product_name')
        .notEmpty().withMessage('Product name is required')
        .isLength({ max: 500 }).withMessage('Product name must be less than 500 characters'),
    
    body('description')
        .optional()
        .isLength({ max: 2000 }).withMessage('Description must be less than 2000 characters'),
    
    body('product_category_id')
        .optional()
        .isLength({ max: 100 }).withMessage('Category must be less than 100 characters'),
    
    body('brand_id')
        .optional()
        .isLength({ max: 200 }).withMessage('Brand must be less than 200 characters'),
    
    body('product_type')
        .optional()
        .isIn(['Goods', 'Services', 'Combo']).withMessage('Invalid product type'),
    
    body('original_price')
        .optional()
        .isFloat({ min: 0 }).withMessage('Original price must be a positive number'),
    
    body('sale_price')
        .optional()
        .isFloat({ min: 0 }).withMessage('Sale price must be a positive number'),
    
    body('sku')
        .optional()
        .isLength({ max: 100 }).withMessage('SKU must be less than 100 characters')
        .custom(async (value) => {
            if (value) {
                const product = await Product.findOne({ where: { sku: value } });
                if (product) {
                    throw new Error('SKU already in use');
                }
            }
            return true;
        }),
    
    body('barcode')
        .optional()
        .isLength({ max: 100 }).withMessage('Barcode must be less than 100 characters')
        .custom(async (value) => {
            if (value) {
                const product = await Product.findOne({ where: { barcode: value } });
                if (product) {
                    throw new Error('Barcode already in use');
                }
            }
            return true;
        }),
    
    body('weight')
        .optional()
        .isFloat({ min: 0 }).withMessage('Weight must be a positive number'),
    
    body('length')
        .optional()
        .isFloat({ min: 0 }).withMessage('Length must be a positive number'),
    
    body('breadth')
        .optional()
        .isFloat({ min: 0 }).withMessage('Breadth must be a positive number'),
    
    body('height')
        .optional()
        .isFloat({ min: 0 }).withMessage('Height must be a positive number')
];

const updateProductValidator = [
    param('id')
        .isUUID().withMessage('Invalid product ID'),
    
    ...createProductValidator
];

const productIdValidator = [
    param('id')
        .isUUID().withMessage('Invalid product ID')
];

module.exports = {
    createProductValidator,
    updateProductValidator,
    productIdValidator
};