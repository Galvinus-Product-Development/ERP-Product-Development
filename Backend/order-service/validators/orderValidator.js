const { body, param } = require('express-validator');

const validStatuses = ['PENDING', 'PAID', 'SHIPPED', 'DELIVERED', 'CANCELLED', 'REFUNDED'];
const validPaymentMethods = ['COD', 'UPI', 'CARD', 'NETBANKING'];

const createOrderValidator = [
    body('user_id').isUUID().withMessage('Invalid user_id'),
    body('shipping_address').notEmpty().withMessage('Shipping address is required'),
    body('payment_method')
    .isIn(validPaymentMethods)
    .withMessage(`Payment method must be one of: ${validPaymentMethods.join(', ')}`),
];
const updateOrderStatusValidator = [
    param('order_id').isUUID(),
    body('status').isIn(validStatuses).withMessage(`Status must be one of: ${validStatuses.join(', ')}`),
];

const updateOrderItemStatusValidator = [
    param('order_item_id').isUUID(),
    body('status').isIn(validStatuses).withMessage(`Status must be one of: ${validStatuses.join(', ')}`),
];

module.exports = {
    createOrderValidator,
    updateOrderStatusValidator,
    updateOrderItemStatusValidator,
    validStatuses
};
