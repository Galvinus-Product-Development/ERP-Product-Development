const { body, param } = require("express-validator");


// Validation rules for creating/updating a ProductItem
const createProductItemValidationRules = [
  body("colour_id").optional().isUUID().withMessage("Colour ID must be a valid UUID"),
  body("size_id").optional().isUUID().withMessage("Size ID must be a valid UUID"),

  body("original_price")
    .optional()
    .isFloat({ gt: 0 }).withMessage("Original price must be a positive decimal")
    .toFloat(),

  body("discount_applicable")
    .optional()
    .isFloat({ min: 0, max: 100 }).withMessage("Discount must be between 0 and 100")
    .toFloat(),

  body("sale_price")
    .optional()
    .isFloat({ gt: 0 }).withMessage("Sale price must be a positive decimal")
    .toFloat(),

  body("qty_in_stocks")
    .optional()
    .isInt({ min: 0 }).withMessage("Stock quantity must be a non-negative integer")
];


// Validator for product_item_id route parameter 
const validateProductItemIdParam = [
  param("product_item_id")
    .isUUID()
    .withMessage("Invalid product_item_id format"),
];

// Optionally, if you need to validate product_id in route parameters 
const validateProductIdParam = [
  param("product_id")
    .isUUID()
    .withMessage("Invalid product_id format"),
];

module.exports = {
  createProductItemValidationRules,
 // updateProductItemValidationRules,
  validateProductItemIdParam,
  validateProductIdParam,
};
