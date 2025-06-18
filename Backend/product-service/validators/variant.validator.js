const { body, param } = require('express-validator');
const { Product, ProductItem, Colour, SizeOption } = require('../models');

const addVariantValidator = [
    param('productId')
        .isUUID().withMessage('Invalid product ID')
        .custom(async (value) => {
            const product = await Product.findByPk(value);
            if (!product) {
                throw new Error('Product not found');
            }
            return true;
        }),
    
    body('colour_id')
        .notEmpty().withMessage('Colour is required')
        .isUUID().withMessage('Invalid colour ID')
        .custom(async (value) => {
            const colour = await Colour.findByPk(value);
            if (!colour) {
                throw new Error('Colour not found');
            }
            return true;
        }),
    
    body('size_id')
        .notEmpty().withMessage('Size is required')
        .isUUID().withMessage('Invalid size ID')
        .custom(async (value) => {
            const size = await SizeOption.findByPk(value);
            if (!size) {
                throw new Error('Size not found');
            }
            return true;
        }),
    
    body('original_price')
        .notEmpty().withMessage('Original price is required')
        .isFloat({ min: 0 }).withMessage('Original price must be a positive number'),
    
    body('discount_applicable')
        .optional()
        .isFloat({ min: 0, max: 100 }).withMessage('Discount must be between 0 and 100'),
    
    body('qty_in_stocks')
        .optional()
        .isInt({ min: 0 }).withMessage('Quantity must be a positive integer'),
    
    body('variant_sku')
        .optional()
        .isLength({ max: 100 }).withMessage('Variant SKU must be less than 100 characters')
        .custom(async (value) => {
            if (value) {
                const variant = await ProductItem.findOne({ where: { variant_sku: value } });
                if (variant) {
                    throw new Error('Variant SKU already in use');
                }
            }
            return true;
        }),
    
    body('variant_barcode')
        .optional()
        .isLength({ max: 100 }).withMessage('Variant barcode must be less than 100 characters')
        .custom(async (value) => {
            if (value) {
                const variant = await ProductItem.findOne({ where: { variant_barcode: value } });
                if (variant) {
                    throw new Error('Variant barcode already in use');
                }
            }
            return true;
        })
];

const variantIdValidator = [
    param('variantId')
        .isUUID().withMessage('Invalid variant ID')
];

const productItemIdValidator = [
    param('productItemId')
        .isUUID().withMessage('Invalid product item ID')
        .custom(async (value) => {
            const variant = await ProductItem.findByPk(value);
            if (!variant) {
                throw new Error('Variant not found');
            }
            return true;
        })
];

module.exports = {
    addVariantValidator,
    variantIdValidator,
    productItemIdValidator
};