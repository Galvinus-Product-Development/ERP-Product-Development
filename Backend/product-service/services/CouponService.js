const {
    Coupon,
    UserCoupon,
    CouponCategory,
    ProductItem,
    Product,
    ProductCategory,
  } = require("../models");
  
  async function getApplicableCoupons(userId, productItemId) {
    const productItem = await ProductItem.findByPk(productItemId, {
      include: {
        model: Product,
        include: ProductCategory
      }
    });
  
    if (!productItem) return [];
  
    const categoryId = productItem.Product?.ProductCategory?.id;
  
    // User's active coupons
    const userCoupons = await UserCoupon.findAll({
      where: { user_id: userId },
      include: {
        model: Coupon,
        include: [{
          model: ProductCategory,
          where: categoryId ? { id: categoryId } : undefined,
          required: false
        }]
      }
    });
  
    // Filter only valid coupons (e.g. expiry, usage)
    const validCoupons = userCoupons
      .map(uc => uc.Coupon)
      .filter(c => new Date(c.expiry_date) > new Date());
  
    return validCoupons;
  }
  
  module.exports = {
    getApplicableCoupons
  };
  