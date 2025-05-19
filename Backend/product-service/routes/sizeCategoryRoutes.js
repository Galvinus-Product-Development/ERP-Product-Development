const express = require("express");
const router = express.Router();
const sizeCategoryController = require("../controllers/sizeCategoryController");
//const { } = require("../middlewares/authMiddleware");
const validationHandler = require("../middlewares/validationHandler");
const { validateSizeCategory, validateCategoryIdParam } = require("../validators/sizeCategoryValidator");


router.get("/", sizeCategoryController.getAllSizeCategories);

router.post("/",  validateSizeCategory, validationHandler, sizeCategoryController.addSizeCategory); // Admin only
router.put("/:category_id",  validateCategoryIdParam, validateSizeCategory, validationHandler, sizeCategoryController.updateSizeCategory); // Admin only
router.delete("/:category_id",  validateCategoryIdParam, validationHandler, sizeCategoryController.deleteSizeCategory); // Admin only

module.exports = router;
