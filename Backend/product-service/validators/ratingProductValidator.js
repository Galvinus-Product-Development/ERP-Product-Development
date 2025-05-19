const { body, param, validationResult } = require("express-validator");

// Middleware to validate product rating data in request body
const validateProductRating = [
  body("product_id").isUUID().withMessage("Invalid product_id format. Must be a UUID."),
  body("user_id").isUUID().withMessage("user_id must be an UUID."),
  body("rating_type_id").isUUID().withMessage("rating_type_id must be an UUID."),
  body("rating_value")
    .isInt({ min: 1, max: 5 })
    .withMessage("rating_value must be an integer between 1 and 5."),

];

// Middleware to validate UUIDs in request parameters
const validateRatingParams = [
  param("rating_product_id").isUUID().withMessage("Invalid rating_product_id format. Must be a UUID."),
  param("product_id").isUUID().withMessage("Invalid product_id format. Must be a UUID."),
  param("user_id").isUUID().withMessage("user_id must be an UUID."),
  param("rating_type_id").isUUID().withMessage("rating_type_id must be an UUID."),

];

module.exports = { validateProductRating, validateRatingParams };


//module.exports = { validateProductRating, validateRatingParams };

/*const validateProductRating = [
  body("product_id")
    .isUUID().withMessage("Product ID must be a valid UUID"),
  
  body("user_id")
    .isUUID().withMessage("User ID must be an integer"),
  
  body("rating_type_id")
    .isUUID().withMessage("Rating Type ID must be a valid UUID"),
  
  body("rating_value")
    .isInt({ min: 1, max: 5 }).withMessage("Rating value must be an integer between 1 and 5"),
  
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

const validateRatingParams = [
  param("product_id")
    .isUUID().withMessage("Product ID must be a valid UUID"),
  
  param("user_id")
    .isUUID().withMessage("User ID must be a valid UUID"),
  
  param("rating_type_id")
    .isUUID().withMessage("Rating Type ID must be a valid UUID"),
  
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];
*/
