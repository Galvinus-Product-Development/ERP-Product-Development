const { body, param } = require("express-validator");

// Validate request body for creating/updating size options
const validateSizeOption = [
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

  body("size_category_id")
    .optional({ nullable: true })
    .isUUID()
    .withMessage("Invalid size_category_id format."),
];

// Validate size_id in route params
const validateSizeIdParam = [
  param("size_id")
    .isUUID()
    .withMessage("Invalid size_id format."),
];

module.exports = { validateSizeOption, validateSizeIdParam };
