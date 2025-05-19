const { check, validationResult } = require('express-validator');

// Middleware to handle validation errors
const handleValidationErrors = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};

// Validation for adding to wishlist
exports.validateAddToWishlist = [
    check('product_id')
        .isUUID()
        .withMessage('Product ID must be a valid UUID'),
    handleValidationErrors
];

// Validation for removing from wishlist
exports.validateRemoveFromWishlist = [
    check('product_id')
        .isUUID()
        .withMessage('Product ID must be a valid UUID'),
    handleValidationErrors
];
