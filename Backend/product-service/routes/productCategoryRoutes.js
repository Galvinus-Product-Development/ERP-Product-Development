const express = require("express");
const router = express.Router();
const productCategoryController = require("../controllers/productCategoryController");
//const { } = require("../middlewares/authMiddleware");
const validationHandler = require("../middlewares/validationHandler");
const { productCategoryValidator, validateUuidParam } = require("../validators/productCategoryValidator");

//console.log("productCategoryValidator:", productCategoryValidator);

router.get("/", productCategoryController.getAllCategories);
router.get("/:product_category_id",validationHandler, validateUuidParam, productCategoryController.getCategoryById);


// Admin routes
router.post("/",  validationHandler, productCategoryValidator, productCategoryController.addProductCategory); // Admin only
router.put("/:product_category_id",  validationHandler, validateUuidParam, productCategoryValidator, productCategoryController.updateProductCategory); // Admin only
router.delete("/:product_category_id",  validationHandler, validateUuidParam, productCategoryController.deleteProductCategory); // Admin only

//  Get all parent categories (Categories without a parent)
router.get("/parents", productCategoryController.getParentCategories);

//  Get all subcategories of a specific category
router.get("/:product_category_id/subcategories", validationHandler, validateUuidParam, productCategoryController.getSubcategories);

//  Move a subcategory under a different parent
router.put("/:subcategory_id/move/:new_parent_id", validationHandler, validateUuidParam, productCategoryController.moveSubcategory);

//  Get all active categories
router.get("/status/active", productCategoryController.getActiveCategories);

//  Get all inactive categories
router.get("/status/inactive", productCategoryController.getInactiveCategories);

module.exports = router;
