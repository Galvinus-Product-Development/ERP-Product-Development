const express = require('express');
const router = express.Router();
const variantController = require('../controllers/variant.controller');
const { addVariantValidator, variantIdValidator, productItemIdValidator } = require('../validators/variant.validator');
const {uploadVariantImage} = require('../middlewares/upload');

// CREATE VARIANT WITH IMAGES IN SINGLE REQUEST
router.post(
    '/:productId/variants', 
    uploadVariantImage.array('images', 5), // Handle images first
    addVariantValidator, 
    variantController.addVariantWithImages
);

// Separate image upload endpoint (for adding more images later)
router.post(
    '/:productItemId/images',
    productItemIdValidator,
    uploadVariantImage.array('images', 5),
    variantController.addVariantImages
);


router.put(
    '/:variantId', 
    variantIdValidator, 
    uploadVariantImage.array('images', 5),
    variantController.updateVariant
);

router.delete(
    '/:variantId', 
    variantIdValidator, 
    variantController.deleteVariant
);

router.get(
    '/:productId/variants', 
    variantController.getProductVariants
);

router.delete('/images/:imageId', variantController.deleteVariantImage);

module.exports = router;