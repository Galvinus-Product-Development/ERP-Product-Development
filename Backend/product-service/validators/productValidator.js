const { body, param } = require("express-validator");

  // Validation rules for UUID fields (foreign keys)

// Validation rules for Product creation/updation
const productValidator = [
  body("productData.product_name")
  .notEmpty().withMessage("Product name is required")
  .isString().withMessage("Product name must be a string")
  .isLength({ max: 500 }).withMessage("Product name must be at most 500 characters"),

body("productData.product_category_id")
  .isUUID().withMessage("Product Category ID must be a valid UUID"),

body("productData.brand_id")
  .isUUID().withMessage("Brand ID must be a valid UUID"),

body("productData.product_description")
  .optional()
  .isString().withMessage("Product description must be a string")
  .isLength({ max: 1000 }).withMessage("Product description must be at most 1000 characters"),

body("productData.status")
  .optional()
  .isIn(["available", "out of stock", "discontinued"])
  .withMessage("Status must be 'available', 'out of stock', or 'discontinued'"),

body("variantData.colour_id")
  .optional()  // Make it optional if it is not required for every product
  .isUUID().withMessage("Colour ID must be a valid UUID"),

body("variantData.size_id")
  .optional()  // Make it optional if it is not required for every product
  .isUUID().withMessage("Size ID must be a valid UUID"),

body("variantData.original_price")
  .isFloat({ gt: 0 }).withMessage("Original price must be a positive decimal")
  .toFloat(),

body("variantData.discount_applicable")
  .optional()
  .isFloat({ min: 0, max: 100 }).withMessage("Discount applicable must be between 0 and 100")
  .toFloat(),

body("variantData.sale_price")
  .isFloat({ gt: 0 }).withMessage("Sale price must be a positive decimal")
  .toFloat(),

body("variantData.qty_in_stocks")
  .isInt({ min: 0 }).withMessage("Quantity in stocks must be a non-negative integer")
];

 


// Validation rules for Product update (Loose - Optional Fields)
const productUpdateValidator = [
  body("product_name")
    .optional()
    .isString().withMessage("Product name must be a string")
    .isLength({ max: 500 }).withMessage("Product name must be at most 500 characters"),

  body("product_category_id")
    .optional()
    .isUUID().withMessage("Product Category ID must be a valid UUID"),

  body("brand_id")
    .optional()
    .isUUID().withMessage("Brand ID must be a valid UUID"),

  body("product_description")
    .optional()
    .isString().withMessage("Product description must be a string")
    .isLength({ max: 1000 }).withMessage("Product description must be at most 1000 characters"),

  body("status")
    .optional()
    .isIn(["available", "out of stock", "discontinued"])
    .withMessage("Status must be 'available', 'out of stock', or 'discontinued'")
];

// Middleware for validating UUID for product_id in route parameters
const validateUuidParam = (paramName) => param(paramName).isUUID().withMessage(`Invalid ${paramName} format`);
//const validateUuidParam = param("product_id")
 // .isUUID()
 // .withMessage("Invalid product ID format");

  // Logging middleware to print the incoming request body  
const logIncomingRequestBody = (req, res, next) => {  
  console.log("Incoming Request Body:", JSON.stringify(req.body, null, 2)); // Log pretty-printed JSON  
  next(); // Move to the next middleware or route handler  
};  

module.exports = { productValidator, productUpdateValidator, logIncomingRequestBody, validateUuidParam };
