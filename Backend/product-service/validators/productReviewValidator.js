const { body, param } = require("express-validator");

const validateProductReview = [
  body("product_id")
    .isUUID()
    .withMessage("Invalid product ID format."),
  
  body("review_title")
    .optional()
    .isString()
    .trim()
    .isLength({ max: 100 })
    .withMessage("Review title must be at most 100 characters."),
  body("review_comment")
    .optional()
    .isString()
    .trim()
    .isLength({ max: 500 })
    .withMessage("Review comment must be at most 500 characters."),
];

const validateReviewIdParam = [
  param("review_id")
    .isUUID()
    .withMessage("Invalid review_id format"),
    param("user_id")
    .isUUID()
    .withMessage("Invalid user ID format."),
];

const validateProductIdParam = [
    param("product_id")
      .isUUID()
      .withMessage("Invalid product_id format."),
  ];

module.exports = { validateProductReview, validateReviewIdParam, validateProductIdParam };
