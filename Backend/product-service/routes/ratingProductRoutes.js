const express = require("express");
const router = express.Router();
const ratingProductController = require("../controllers/ratingProductController");
//const { authenticateAdmin } = require("../middlewares/authMiddleware");
const validationHandler = require("../middlewares/validationHandler");
const { validateProductRating, validateRatingParams } = require("../validators/ratingProductValidator");

router.get("/:product_id", validationHandler, validateRatingParams, ratingProductController.getRatingsByProduct);

router.post("/", validationHandler, [...validateProductRating] , ratingProductController.addProductRating);
router.put("/:rating_product_id/:product_id/:user_id/:rating_type_id", validationHandler , [...validateProductRating], validateRatingParams, ratingProductController.updateProductRating);
router.delete("/:rating_product_id/:product_id/:user_id/:rating_type_id",validationHandler ,  validateRatingParams, ratingProductController.deleteProductRating);

module.exports = router;
