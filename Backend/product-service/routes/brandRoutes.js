const express = require('express');
const router = express.Router();
const brandController = require('../controllers/brandController');
//const  } = require("../middlewares/authMiddleware");
const validationHandler = require("../middlewares/validationHandler");
const { validateBrand, validateBrandId } = require("../validators/brandValidator");
const { uploadBrandImage } = require("../middlewares/upload");

// GET all brands
router.get('/', brandController.getAllBrands);

// GET a single brand by ID
router.get('/:id', validateBrandId, validationHandler, brandController.getBrandById);

// CREATE a new brand
router.post('/', uploadBrandImage.single("brand_image_url"),   validateBrand, validationHandler, brandController.createBrand);  // Admin only

// UPDATE an existing brand
router.put('/:id', uploadBrandImage.single("brand_image_url"), validateBrandId, validateBrand , validationHandler,  brandController.updateBrand); // Admin only

// SOFT DELETE a brand
router.delete('/:id', validateBrandId, validationHandler,  brandController.deleteBrand); // Admin only

// RESTORE a soft-deleted brand
router.patch('/:id/restore', validateBrandId, validationHandler, brandController.restoreBrand); // Admin only

module.exports = router;
