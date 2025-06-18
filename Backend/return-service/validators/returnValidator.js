/*const { body, param } = require('express-validator');

const validReturnStatuses = ['REQUESTED', 'APPROVED', 'REJECTED', 'PROCESSED'];
const validRefundStatuses = ['PENDING', 'PROCESSED', 'FAILED'];

const createReturnValidator = [
    body('order_id').isUUID().withMessage('Order ID must be a valid UUID'),
    body('reason_id').optional().isInt().withMessage('Reason ID must be an integer'),
    body('status').optional().isIn(validReturnStatuses).withMessage('Invalid return status')
];

const updateReturnStatusValidator = [
    param('id').isUUID().withMessage('Return request ID must be a valid UUID'),
    body('status').isIn(validReturnStatuses).withMessage('Invalid return status')
];

const createRefundValidator = [
    body('return_id').isUUID().withMessage('Return request ID must be a valid UUID'),
    body('refund_amount').isFloat({ gt: 0 }).withMessage('Refund amount must be greater than 0'),
    body('refund_method').notEmpty().withMessage('Refund method is required'),
    body('refund_status').optional().isIn(validRefundStatuses).withMessage('Invalid refund status')
];

module.exports = {
    createReturnValidator,
    updateReturnStatusValidator,
    createRefundValidator
};
*/