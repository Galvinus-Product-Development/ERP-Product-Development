const { body, param } = require("express-validator");

const colourValidator = [
  body("colour_name")
    .isString().withMessage("Colour name must be a string")
    .isLength({ max: 100 }).withMessage("Colour name must not exceed 100 characters")
    .notEmpty().withMessage("Colour name is required"),

  body("colour_code")
    .optional()
    .isString().withMessage("Colour code must be a string")
    .isLength({ max: 10 }).withMessage("Colour code must not exceed 10 characters"),

];

const validateColourId = [
  param("id")
    .isUUID().withMessage("Colour ID must be a valid UUID"),
];

module.exports = { colourValidator , validateColourId };
