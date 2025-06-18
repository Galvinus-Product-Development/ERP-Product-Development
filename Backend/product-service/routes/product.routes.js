const express = require('express');
const router = express.Router();
const productController = require('../controllers/product.controller');
const { createProductValidator, updateProductValidator, productIdValidator } = require('../validators/product.validator');
const {uploadProductImage} = require('../middlewares/upload');

// CREATE PRODUCT WITH IMAGES IN SINGLE REQUEST
router.post('/', 
    uploadProductImage.array('images', 10), // Handle images first
    createProductValidator, 
    productController.createProductWithImages
);

// Separate image upload endpoint (for adding more images later)
router.post(
    '/:productId/images',
    productIdValidator,
    uploadProductImage.array('images', 10),
    productController.addProductImages
);


router.get('/', productController.listProducts);
router.get('/:id',  productIdValidator, productController.getProductById);
router.put('/:id', uploadProductImage.array('images', 10), updateProductValidator, productController.updateProductWithImages);
router.delete('/:id', productIdValidator, productController.deleteProduct);
router.patch('/:id/toggle-publish', productIdValidator, productController.togglePublishStatus);

module.exports = router;