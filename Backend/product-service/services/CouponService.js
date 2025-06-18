const {
    Coupon,
    CouponReward,
    CouponRule,
    CouponRewardCategory,
    CouponRewardProduct,
    CouponRuleCategory,
    CouponRuleProduct,
    Product,
    ProductCategory,
    CouponUsage
  } = require('../models');
  
  exports.createCoupon = async (couponData) => {
    return await Coupon.create(couponData);
  };
  
  exports.getCouponById = async (id) => {
    return await Coupon.findByPk(id, {
      include: [
        { model: CouponReward, as: 'rewards', include: ['rewardCategories', 'rewardProducts'] },
        { model: CouponRule, as: 'rules', include: ['ruleCategories', 'ruleProducts'] }
      ]
    });
  };
  
  exports.getAllCoupons = async (queryParams = {}) => {
    const { page = 1, limit = 10, search, status, discountType } = queryParams;
    const where = {};
    const offset = (page - 1) * limit;
    
    if (status) where.status = status;
    if (discountType) where.discount_type = discountType;
    
    if (search) {
      where[Op.or] = [
        { discount_name: { [Op.iLike]: `%${search}%` } },
        { discount_code: { [Op.iLike]: `%${search}%` } }
      ];
    }
  
    return await Coupon.findAndCountAll({
      where,
      limit: parseInt(limit),
      offset: offset,
      order: [['created_at', 'DESC']],
      include: [
        { 
          model: CouponReward, 
          as: 'rewards',
          attributes: ['reward_type', 'discount_value_type', 'discount_value', 'maximum_discount']
        }
      ]
    });
  };
  
  exports.updateCoupon = async (id, updateData) => {
    const coupon = await Coupon.findByPk(id);
    if (!coupon) return null;
    
    return await coupon.update(updateData);
  };
  
  exports.deleteCoupon = async (id) => {
    const coupon = await Coupon.findByPk(id);
    if (!coupon) return false;
    
    await coupon.destroy();
    return true;
  };
  
  exports.validateCoupon = async (code, userId, orderDetails) => {
    const coupon = await Coupon.findOne({ 
      where: { discount_code: code },
      include: [
        { model: CouponReward, as: 'rewards' },
        { model: CouponRule, as: 'rules' }
      ]
    });
    
    if (!coupon) throw new Error('Invalid coupon code');
    
    // Check expiration
    if (new Date() > new Date(coupon.end_date)) {
      throw new Error('Coupon has expired');
    }
    
    // Check usage limits
    if (coupon.usage_limit_type === 'total' && coupon.current_usage_count >= coupon.usage_limit_value) {
      throw new Error('Coupon usage limit reached');
    }
    
    if (coupon.usage_limit_type === 'per_user') {
      const userUsage = await CouponUsage.count({ 
        where: { 
          coupon_id: coupon.coupon_id,
          user_id: userId
        }
      });
      if (userUsage >= 1) {
        throw new Error('Coupon already used by this user');
      }
    }
    
    // Validate rules against order
    const validationErrors = [];
    let applicableRewards = [];
    
    for (const rule of coupon.rules) {
      if (rule.rule_type === 'minimum_order_value' && orderDetails.subtotal < rule.minimum_order_value) {
        validationErrors.push(`Minimum order value of ${rule.minimum_order_value} not met`);
      }
      
      if (rule.rule_type === 'minimum_quantity' && orderDetails.totalQuantity < rule.minimum_quantity) {
        validationErrors.push(`Minimum quantity of ${rule.minimum_quantity} not met`);
      }
      
      // Add more rule validations as needed
    }
    
    if (validationErrors.length > 0) {
      throw new Error(validationErrors.join(', '));
    }
    
    // Get applicable rewards
    applicableRewards = coupon.rewards.filter(reward => {
      // Add reward applicability logic based on order items
      return true;
    });
    
    return {
      coupon,
      applicableRewards,
      isValid: true
    };
  };
  
  exports.addRuleToCoupon = async (couponId, ruleData) => {
    const coupon = await Coupon.findByPk(couponId);
    if (!coupon) throw new Error('Coupon not found');
    
    const rule = await CouponRule.create({
      coupon_id: couponId,
      ...ruleData
    });
    
    // Handle product/category associations if needed
    if (ruleData.productIds) {
      await Promise.all(ruleData.productIds.map(productId => 
        CouponRuleProduct.create({ rule_id: rule.rule_id, product_id: productId })
      ));
    }
    
    if (ruleData.categoryIds) {
      await Promise.all(ruleData.categoryIds.map(categoryId => 
        CouponRuleCategory.create({ rule_id: rule.rule_id, product_category_id: categoryId })
      ));
    }
    
    return rule;
  };
  
  exports.addRewardToCoupon = async (couponId, rewardData) => {
    const coupon = await Coupon.findByPk(couponId);
    if (!coupon) throw new Error('Coupon not found');
    
    const reward = await CouponReward.create({
      coupon_id: couponId,
      ...rewardData
    });
    
    // Handle product/category associations if needed
    if (rewardData.productIds) {
      await Promise.all(rewardData.productIds.map(productId => 
        CouponRewardProduct.create({ 
          reward_id: reward.reward_id, 
          product_id: productId,
          is_reward_product: rewardData.reward_type === 'product'
        })
      ));
    }
    
    if (rewardData.categoryIds) {
      await Promise.all(rewardData.categoryIds.map(categoryId => 
        CouponRewardCategory.create({ 
          reward_id: reward.reward_id, 
          product_category_id: categoryId,
          is_reward_category: rewardData.reward_type === 'category'
        })
      ));
    }
    
    return reward;
  };
  
  exports.recordCouponUsage = async (couponId, userId, orderId, discountAmount) => {
    await CouponUsage.create({
      coupon_id: couponId,
      user_id: userId,
      order_id: orderId,
      discount_amount: discountAmount
    });
    
    // Increment usage count
    await Coupon.increment('current_usage_count', {
      where: { coupon_id: couponId }
    });
  };