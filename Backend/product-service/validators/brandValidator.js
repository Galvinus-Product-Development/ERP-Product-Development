const { body, param } = require("express-validator");

// Validator for Creating & Updating a Brand
const validateBrand = [
  body("brand_name")
    .trim()
    .notEmpty().withMessage("Brand name is required")
    .isLength({ max: 200 }).withMessage("Brand name must be at most 200 characters"),

  body("brand_description")
    .optional()
    .isLength({ max: 2000 }).withMessage("Description must be at most 2000 characters"),

 /* body("brand_image_url")
    .optional()
    .isString().withMessage("Brand image URL must be a String")
    .isURL().withMessage("Invalid image URL format"),  */

  body("createdAt")
    .optional()
    .isISO8601().withMessage("Invalid createdAt timestamp"),

  body("updatedAt")
    .optional()
    .isISO8601().withMessage("Invalid updatedAt timestamp"),
];

// Validator for Brand ID (UUID format)
const validateBrandId = [
  param("id")
    .isUUID().withMessage("Invalid brand ID format"),
];

module.exports = {
  validateBrand,
  validateBrandId,
};
