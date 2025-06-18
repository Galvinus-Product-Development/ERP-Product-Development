const couponService = require('../services/couponService');

exports.createCoupon = async (req, res) => {
  try {
    const coupon = await couponService.createCoupon(req.body);
    res.status(201).json(coupon);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getCoupon = async (req, res) => {
  try {
    const coupon = await couponService.getCouponById(req.params.id);
    if (!coupon) {
      return res.status(404).json({ error: 'Coupon not found' });
    }
    res.json(coupon);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAllCoupons = async (req, res) => {
  try {
    const result = await couponService.getAllCoupons({
      ...req.query,
      page: req.query.page || 1,
      limit: req.query.limit || 10,
      search: req.query.search
    });
    
    res.json({
      data: result.rows,
      total: result.count,
      page: parseInt(req.query.page) || 1,
      limit: parseInt(req.query.limit) || 10,
      totalPages: Math.ceil(result.count / (req.query.limit || 10))
    });
  } catch (error) {
    console.error('Error fetching coupons:', error);
    res.status(500).json({ error: error.message });
  }
};

exports.updateCoupon = async (req, res) => {
  try {
    const updatedCoupon = await couponService.updateCoupon(req.params.id, req.body);
    if (!updatedCoupon) {
      return res.status(404).json({ error: 'Coupon not found' });
    }
    res.json(updatedCoupon);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteCoupon = async (req, res) => {
  try {
    const deleted = await couponService.deleteCoupon(req.params.id);
    if (!deleted) {
      return res.status(404).json({ error: 'Coupon not found' });
    }
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.validateCoupon = async (req, res) => {
  try {
    const validation = await couponService.validateCoupon(
      req.params.code,
      req.body.userId,
      req.body.orderDetails
    );
    res.json(validation);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.addRuleToCoupon = async (req, res) => {
  try {
    const rule = await couponService.addRuleToCoupon(req.params.couponId, req.body);
    res.status(201).json(rule);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.addRewardToCoupon = async (req, res) => {
  try {
    const reward = await couponService.addRewardToCoupon(req.params.couponId, req.body);
    res.status(201).json(reward);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};