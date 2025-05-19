const { body, param } = require("express-validator");

// Validate request body for creating/updating size categories
const validateSizeCategory = [
  body("category_name")
    .isString()
    .trim()
    .notEmpty()
    .withMessage("Category name is required.")
    .isLength({ max: 100 })
    .withMessage("Category name must be at most 100 characters."),
];

// Validate category_id in route params
const validateCategoryIdParam = [
  param("category_id")
    .isUUID()
    .withMessage("Invalid category_id format."),
];

module.exports = { validateSizeCategory, validateCategoryIdParam };
