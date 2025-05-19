const { body, param } = require("express-validator");

// Validate request body for creating/updating rating types
const validateRatingType = [
  body("rating_name")
    .isString()
    .trim()
    .notEmpty()
    .withMessage("Rating name is required.")
    .isLength({ max: 25 })
    .withMessage("Rating name must be at most 25 characters."),
  
  body("label_min")
    .optional()
    .isString()
    .trim()
    .isLength({ max: 20 })
    .withMessage("Label min must be at most 20 characters."),

  body("label_max")
    .optional()
    .isString()
    .trim()
    .isLength({ max: 20 })
    .withMessage("Label max must be at most 20 characters."),
];

// Validate rating_type_id in route params
const validateRatingTypeIdParam = [
  param("rating_type_id")
    .isUUID()
    .withMessage("Invalid rating_type_id format."),
];

module.exports = { validateRatingType, validateRatingTypeIdParam };
