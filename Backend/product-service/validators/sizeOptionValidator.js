const { body, param } = require("express-validator");

// Validate request body for creating/updating size options
const validateSize = [
  body("size_name")
    .isString()
    .trim()
    .notEmpty()
    .withMessage("Size name is required.")
    .isLength({ max: 100 })
    .withMessage("Size name must be at most 100 characters."),

  body("sort_order")
    .optional()
    .isInt()
    .withMessage("Sort order must be an integer."),

    body('product_category_id')
    .optional()
    .isUUID().withMessage('Product category ID must be a valid UUID'),
  
];

module.exports = { validateSize };
