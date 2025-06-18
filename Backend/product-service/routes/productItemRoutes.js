const express = require("express");
const router = express.Router();
const productItemController = require("../controllers/productItemController");
//const { } = require("../middlewares/authMiddleware");
const validationHandler = require("../middlewares/validationHandler");
const { createProductItemValidationRules,
     validateProductItemIdParam, validateProductIdParam} = require("../validators/productItemValidator");


router.get("/product/:product_id", validateProductIdParam, validationHandler , productItemController.getProductItems); //Public 
router.get("/item/:product_item_id", validateProductItemIdParam, validationHandler, productItemController.getProductItemById);//Public 
 router.post("/:product_id", validateProductIdParam, createProductItemValidationRules, validationHandler, productItemController.addProductItem); // Admin only
router.put("/:product_item_id",   validateProductItemIdParam, createProductItemValidationRules, validationHandler, productItemController.updateProductItem); // Admin only
router.delete("/:product_item_id",   validateProductItemIdParam, validationHandler, productItemController.deleteProductItem); // Admin only

module.exports = router;
