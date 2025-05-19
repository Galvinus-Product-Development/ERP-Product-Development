const express = require("express");
const router = express.Router();
const CouponController = require("../controllers/CouponController");

router.get("/product-item/:productItemId", CouponController.getUserCouponsForProductItem);

module.exports = router;
