
const VALID_STATUSES = ['PENDING', 'SHIPPED', 'DELIVERED', 'FAILED', 'CANCELLED', 'REFUNDED'];

const isValidStatus = (status) => VALID_STATUSES.includes(status);

module.exports = { isValidStatus };

/*const { body, param } = require('express-validator');

const validShippingStatuses = ['pending', 'shipped', 'delivered', 'returned'];

const createShipmentValidator = [
  body('order_items_id').isUUID().withMessage('order_items_id must be a valid UUID'),
  body('tracking_number').notEmpty().withMessage('Tracking number is required'),
  body('shipping_status').optional().isIn(validShippingStatuses).withMessage('Invalid shipping status'),
  body('carrier').notEmpty().withMessage('Carrier is required'),
];

const updateShipmentStatusValidator = [
  param('id').isUUID().withMessage('Shipment ID must be a valid UUID'),
  body('shipping_status').isIn(validShippingStatuses).withMessage('Invalid shipping status'),
];

const createPartnerValidator = [
  body('partner_name').notEmpty().withMessage('Partner name is required'),
  // Additional validations for contact_email, contact_phone can be added here.
];

module.exports = {
  createShipmentValidator,
  updateShipmentStatusValidator,
  createPartnerValidator,
};
*/