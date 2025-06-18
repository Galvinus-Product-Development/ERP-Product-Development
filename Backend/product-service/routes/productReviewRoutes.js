const express = require("express");
const router = express.Router();
const productReviewController = require("../controllers/productReviewController");
//const { authenticateAdmin } = require("../middlewares/authMiddleware");
const validationHandler = require("../middlewares/validationHandler");
const { validateProductReview, validateReviewIdParam, validateProductIdParam  } = require("../validators/productReviewValidator");

router.post("/", validationHandler, validateProductReview, productReviewController.addProductReview);
router.get("/:product_id", validationHandler, validateProductIdParam, productReviewController.getReviewsByProduct);
router.get("/review/:review_id", validationHandler, validateReviewIdParam, productReviewController.getReviewById);
router.put("/review/:review_id/:user_id", validationHandler, validateReviewIdParam, validateProductReview, productReviewController.updateProductReview);
router.delete("/review/:review_id/:user_id", validationHandler, validateReviewIdParam, productReviewController.deleteProductReview);

module.exports = router;
