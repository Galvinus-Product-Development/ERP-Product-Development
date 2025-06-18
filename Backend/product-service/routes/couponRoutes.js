const express = require('express');
const router = express.Router();
const couponController = require('../controllers/couponController');
const couponValidator = require('../validators/couponValidator');

// Coupon CRUD
router.post('/', couponValidator.validateCreate, couponController.createCoupon);
router.get('/', (req, res, next) => {
    req.query.page = req.query.page || 1;
    req.query.limit = req.query.limit || 10;
    next();
  }, couponController.getAllCoupons);
router.get('/:id', couponController.getCoupon);
router.put('/:id', couponValidator.validateUpdate, couponController.updateCoupon);
router.delete('/:id', couponController.deleteCoupon);

// Coupon Validation
router.post('/validate/:code', couponValidator.validateCode, couponController.validateCoupon);

// Rules and Rewards
router.post('/:couponId/rules', couponValidator.validateRule, couponController.addRuleToCoupon);
router.post('/:couponId/rewards', couponValidator.validateReward, couponController.addRewardToCoupon);

module.exports = router;