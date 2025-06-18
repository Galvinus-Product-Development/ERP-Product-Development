const { body, param, query } = require('express-validator');

exports.validateCreate = [
  body('discount_name').notEmpty().withMessage('Discount name is required'),
  body('discount_code')
    .notEmpty().withMessage('Discount code is required')
    .isAlphanumeric().withMessage('Discount code must be alphanumeric'),
  body('discount_type').isIn([
    'ProductDiscount', 
    'TotalOrderDiscount', 
    'BuyYAndGetX', 
    'FreeShipping'
  ]).withMessage('Invalid discount type'),
  body('start_date').isISO8601().toDate(),
  body('end_date').isISO8601().toDate(),
  body('usage_limit_type').optional().isIn(['total', 'per_user']),
  body('usage_limit_value').optional().isInt({ min: 1 })
];

exports.validateUpdate = [
  param('id').isUUID().withMessage('Invalid coupon ID'),
  body('discount_name').optional().notEmpty(),
  body('discount_code').optional().isAlphanumeric(),
  body('status').optional().isIn(['active', 'inactive', 'expired']),
  body('start_date').optional().isISO8601().toDate(),
  body('end_date').optional().isISO8601().toDate()
];

exports.validateCode = [
  param('code').notEmpty().withMessage('Coupon code is required'),
  body('userId').optional().isUUID(),
  body('orderDetails').isObject().withMessage('Order details are required')
];

exports.validateRule = [
  param('couponId').isUUID().withMessage('Invalid coupon ID'),
  body('rule_type').isIn([
    'minimum_order_value', 
    'minimum_quantity',
    'product_based',
    'category_based'
  ]).withMessage('Invalid rule type'),
  body('minimum_order_value').optional().isFloat({ min: 0 }),
  body('minimum_quantity').optional().isInt({ min: 1 }),
  body('productIds').optional().isArray(),
  body('categoryIds').optional().isArray()
];

exports.validateReward = [
  param('couponId').isUUID().withMessage('Invalid coupon ID'),
  body('reward_type').isIn([
    'product_discount',
    'order_discount',
    'free_product',
    'free_shipping'
  ]).withMessage('Invalid reward type'),
  body('discount_value_type').optional().isIn(['fixed', 'percentage']),
  body('discount_value').optional().isFloat({ min: 0 }),
  body('maximum_discount').optional().isFloat({ min: 0 }),
  body('free_quantity').optional().isInt({ min: 1 }),
  body('free_shipping_enabled').optional().isBoolean(),
  body('shipping_countries').optional().isArray(),
  body('productIds').optional().isArray(),
  body('categoryIds').optional().isArray()
];