const CouponService = require("../services/CouponService");

async function getUserCouponsForProductItem(req, res) {
    const { productItemId } = req.params;
    const userId = req.user.id; // Assuming JWT or session middleware
  
    try {
      const coupons = await couponService.getApplicableCoupons(userId, productItemId);
      res.json({ coupons });
    } catch (err) {
      res.status(500).json({ error: "Failed to fetch coupons." });
    }
  }

module.exports = { getUserCouponsForProductItem };
