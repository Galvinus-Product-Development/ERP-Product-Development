const express = require("express");
const router = express.Router();
const ProductImageController = require("../controllers/productImageController");
//const { authenticateAdmin } = require("../middlewares/authMiddleware");
const validationHandler = require("../middlewares/validationHandler");
const { validateProductItemId, validateProductImageId } = require("../validators/productImageValidator");
const { uploadProductImage } = require("../middlewares/upload");

// ✅ Upload images for a specific product variant (Up to 5 images)
router.post(
    "/:product_item_id",
    validateProductItemId,
    validationHandler,
    uploadProductImage.array("images", 5),  // Your existing middleware for image upload
    ProductImageController.uploadProductImages
  );
  
  // ✅ Retrieve all images for a specific product variant
  router.get(
    "/:product_item_id",
    validateProductItemId,
    validationHandler,
    ProductImageController.getProductImages
  );
  
  // ✅ Delete a specific image by its ID
  router.delete(
    "/:image_id",
    validateProductImageId,
    validationHandler,
    ProductImageController.deleteProductImage
  );
  
  module.exports = router;