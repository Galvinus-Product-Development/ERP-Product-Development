const ShippingOrder = require('../models/ShippingOrder');
const ShippingAuditLog = require('../models/ShippingAuditLog');
const axios = require('axios');
const { ORDER_SERVICE_URL } = require('../config/db');
const { isValidStatus } = require('../validators/shipmentValidator');

const getOrderItemDetails  = async (order_id, order_item_id) => {
  const response = await axios.get(`${ORDER_SERVICE_URL}/${order_id}/items/${order_item_id}`);
  if (response.status !== 200) throw new Error('Order item details not found');
  return response.data;
};

const createShippingOrder = async (payload) => {
  const { order_id, order_item_id } = payload;

 // Fetch the order item details (e.g., product, quantity)
 const orderItemDetails = await getOrderItemDetails(order_id, order_item_id);
 if (!orderItemDetails) throw new Error('Invalid order_id or order_item_id');

  // Estimate delivery date (+5 days from now)
  const estimatedDelivery = new Date();
  estimatedDelivery.setDate(estimatedDelivery.getDate() + 11);

 // Create shipping order with additional details
 return ShippingOrder.create({
  order_id,
    order_item_id,
    shipping_address: payload.shipping_address,
    courier: payload.carrier || 'GenericCourier', // fallback
    service_level: payload.service_level || 'STANDARD',
    tracking_number: payload.tracking_number,
    estimated_delivery_date: estimatedDelivery,
    status: 'PENDING',
   product_details: orderItemDetails.product_details, // Add relevant fields
   quantity: orderItemDetails.quantity
 });
};

const updateShippingStatus = async (shipping_id, new_status, changed_by = 'SYSTEM') => {
  const shipping = await ShippingOrder.findByPk(shipping_id);
  if (!shipping) throw new Error('Shipping record not found');

  if (!isValidStatus(new_status)) throw new Error('Invalid status');

  const old_status = shipping.status;
  shipping.status = new_status;

   // Set timestamps based on new status
  if (new_status === 'SHIPPED') {
    shipping.shipped_at = new Date(); // Set 'shipped_at' when status is SHIPPED
  }
  if (new_status === 'DELIVERED') {
    shipping.delivered_at = new Date(); // Set 'delivered_at' when status is DELIVERED
  }

  await shipping.save();

  await ShippingAuditLog.create({
    shipping_id,
    old_status,
    new_status,
    changed_by
  });

  // 1️⃣ Update OrderItem status in Order Service
  await axios.patch(`${ORDER_SERVICE_URL}/order-items/${shipping.order_item_id}/status`, {
    newStatus: new_status,
    changedBy: changed_by
  });

  // 2️⃣ Update Order status if needed
  await axios.patch(`${ORDER_SERVICE_URL}/orders/${shipping.order_id}/evaluate-status`);

  return shipping;
};

const getShippingByOrder = (order_id) => {
  return ShippingOrder.findAll({ where: { order_id } });
};

const getShippingById = (id) => {
  return ShippingOrder.findByPk(id);
};

const getTrackingDetails = async (order_id, order_item_id) => {
  const shipping = await ShippingOrder.findOne({
    where: { order_id, order_item_id }
  });

  if (!shipping) throw new Error('Shipping record not found');

  const auditLogs = await ShippingAuditLog.findAll({
    where: { shipping_id: shipping.shipping_id },
    order: [['changed_at', 'ASC']]
  });

  const orderItem = await getOrderItemDetails(order_id, order_item_id);

  const trackingEvents = auditLogs.map(log => ({
    status: log.new_status,
    date: new Date(log.changed_at).toDateString(),
    details: [`Status changed from ${log.old_status || 'N/A'} to ${log.new_status} by ${log.changed_by}`]
  }));

  return {
    product: {
          name: orderItem.product_details.name || 'Unknown Product',
          size: orderItem.product_details.size || 'N/A',
          unit_price: orderItem.unit_price || 0,
          quantity: orderItem.quantity || 1,
          item_total: orderItem.item_total || 0,
          image: orderItem.product_details.image || 'No image available'
    },
    trackingEvents
  };
};

const createReversePickup = async (payload) => {
  const { order_id, order_item_id } = payload;

  const orderItemDetails = await getOrderItemDetails(order_id, order_item_id);
  if (!orderItemDetails) throw new Error('Invalid order_id or order_item_id');

  const estimatedPickupDate = new Date();
  estimatedPickupDate.setDate(estimatedPickupDate.getDate() + 2); // Pickup scheduled within 2 days

  return ShippingOrder.create({
    order_id,
    order_item_id,
    shipping_address: payload.pickup_address, // renamed field
    courier: payload.carrier || 'GenericCourier',
    service_level: 'REVERSE_PICKUP',
    tracking_number: `REV-${Math.floor(Math.random() * 100000000)}`,
    estimated_delivery_date: estimatedPickupDate,
    status: 'PENDING',
    product_details: orderItemDetails.product_details,
    quantity: orderItemDetails.quantity
  });
};



module.exports = {
  createShippingOrder,
  updateShippingStatus,
  getShippingByOrder,
  getShippingById,
  getTrackingDetails
};
