const express = require("express");
const router = express.Router();
const DiscountController = require("../controllers/DiscountController");

router.get("/product-item/:productItemId", DiscountController.getDiscountsForProductItem);

module.exports = router;
