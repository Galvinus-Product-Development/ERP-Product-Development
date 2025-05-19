const { body, param } = require("express-validator");

const productCategoryValidator = [

  body("category_name")
    .isString().withMessage("Category name must be a string")
    .isLength({ max: 100 }).withMessage("Category name must not exceed 100 characters")
    .notEmpty().withMessage("Category name is required"),
  
  body("category_image")
    .optional()
    .isArray().withMessage("Category image must be an array of URLs"),
  
  body("category_image.*")
    .optional()
    .isURL().withMessage("Each category image must be a valid URL"),
  
  body("category_description")
    .optional()
    .isString().withMessage("Category description must be a string")
    .isLength({ max: 2000 }).withMessage("Category description must not exceed 2000 characters"),
  
  body("size_category_id")
    .optional()
    .isUUID().withMessage("Size category ID must be an integer"),
  
  body("parent_category_id")
    .optional()
    .isUUID().withMessage("Parent category ID must be a valid UUID"),
  
  body("status")
    .optional()
    .isIn(["active", "inactive"]).withMessage("Status must be either 'active' or 'inactive'"),

  
];
// Middleware for validating UUID for product_id in route parameters
const validateUuidParam = param("id")
  .isUUID()
  .withMessage("Invalid product ID format");

module.exports = { productCategoryValidator, validateUuidParam };
//module.exports = productCategoryValidator;
