const { body, param, validationResult } = require('express-validator');

// Common UUID validation
const validateUserId = param('userId')
    .isUUID()
    .withMessage('Invalid userId format');

// Add Item Validation
const validateAddItem = [
    validateUserId,
    body('product_item_id')
        .isUUID()
        .withMessage('Invalid product_item_id format'),
    body('quantity')
        .isInt({ min: 1 })
        .withMessage('Quantity must be at least 1'),
    handleValidationErrors
];

// Update Item Validation
const validateUpdateItem = [
    validateUserId,
    
    body('quantity')
        .isInt({ min: 1 })
        .withMessage('Quantity must be at least 1'),
    handleValidationErrors
];

// Remove Item Validation
const validateRemoveItem = [
    validateUserId,
   
];

// Helper to send validation errors
function handleValidationErrors(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
}

module.exports = {
    validateAddItem,
    validateUpdateItem,
    validateRemoveItem
};
