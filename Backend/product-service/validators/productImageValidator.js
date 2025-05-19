const { body, param } = require("express-validator");

// ✅ Validate UUID parameters for URL-based validation
const validateUuidParam = (field) =>
  param(field)
    .isUUID()
    .withMessage(`${field} must be a valid UUID`);

// ✅ Specific validator for `image_id` URL parameter
const validateProductImageId= validateUuidParam("image_id");

// ✅ Specific validator for `product_item_id` URL parameter
const validateProductItemId = validateUuidParam("product_item_id");


// Exporting all validation rules
module.exports = { 
  validateProductImageId,
  validateProductItemId
 
};
