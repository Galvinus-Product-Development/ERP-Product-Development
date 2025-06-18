const { sequelize } = require('../config/db');
const axios = require('axios');
const { ReturnRequest, ReturnAuditLog, ReturnAttachment } = require('../models');
const {ORDER_SERVICE_URL, PAYMENT_SERVICE_URL, SHIPPING_SERVICE_URL } = require('../config/db');

class ReturnService {
  // 1. Check if the return request is eligible
  async checkReturnEligibility(orderId, orderItemId) {
    // 1.1 Call Order Service to check order status
    const orderResponse = await axios.get(`${ORDER_SERVICE_URL}/${orderId}`);
    const order = orderResponse.data;

    // 1.2 Check if order status is 'DELIVERED'
    const orderItem = order.items.find(item => item.id === orderItemId);
    if (!orderItem) throw new Error('Order item not found in the order');
if (orderItem.status !== 'DELIVERED') throw new Error('Item not delivered yet');


    // 1.3 Call Shipping Service to get the delivery date
    const trackingResponse = await axios.get(`${SHIPPING_SERVICE_URL}/tracking/${orderId}/${orderItemId}`);
    const deliveryDate = trackingResponse.data.delivered_at;

    // 1.4 Compute return window expiry date
    const returnWindowExpiry = new Date(deliveryDate);
    returnWindowExpiry.setDate(returnWindowExpiry.getDate() + 7); // Return window is 7 days

    return returnWindowExpiry;
  }

  // 2. Create a return request
  async createReturnRequest(orderId, orderItemId, userId, reason) {
    const returnWindowExpiresAt = await this.checkReturnEligibility(orderId, orderItemId);

    const returnRequest = await ReturnRequest.create({
      order_id: orderId,
      order_item_id: orderItemId,
      user_id: userId,
      reason,
      return_window_expires_at: returnWindowExpiresAt
    });

    return returnRequest;
  }

  // 3. Update status to 'APPROVED' and create an audit log
  async approveReturnRequest(returnId, changedBy) {
    const returnRequest = await ReturnRequest.findByPk(returnId);
    if (!returnRequest) {
      throw new Error('Return request not found');
    }

    const oldStatus = returnRequest.status;
    returnRequest.status = 'APPROVED';
    // Fetch order item price from Order Service
  const orderResponse = await axios.get(`${ORDER_SERVICE_URL}/${returnRequest.order_id}`);
  const orderItem = orderResponse.data.items.find(item => item.id === returnRequest.order_item_id);

  if (!orderItem) throw new Error('Order item not found in order');
  //  Fetch payment info for this order item
    const paymentResponse = await axios.get(`${PAYMENT_SERVICE_URL}/by-order/${returnRequest.order_id}`);
    const payment = paymentResponse.data;

    if (!payment || !payment.id) {
        throw new Error('Associated payment not found for refund');
    }
  
  // Store refund amount on the returnRequest
   returnRequest.status = 'APPROVED';
  returnRequest.refund_amount = orderItem.price;
  returnRequest.payment_id = payment.id;
    await returnRequest.save();

    // Insert an audit log for the status change
    await ReturnAuditLog.create({
      return_id: returnRequest.return_id,
      old_status: oldStatus,
      new_status: 'APPROVED',
      changed_by: changedBy
    });

    // 4. Update order item status to 'RETURN_REQUESTED'
    await axios.patch(`${ORDER_SERVICE_URL}/order-items/${returnRequest.order_item_id}/status`, { status: 'RETURN_REQUESTED' });

    

    //  Trigger refund through Payment Service
    await this.triggerRefund(returnRequest.return_id, payment.id, orderItem.price);

    return returnRequest;

  }

  // 4. Trigger Refund through Payment Service
  async triggerRefund(returnRequestId, paymentId, amount) {
    const returnRequest = await ReturnRequest.findByPk(returnRequestId);
    if (!returnRequest) {
      throw new Error('Return request not found');
    }
try {
    // Call the Payment Service to trigger refund via Razorpay
    const refundResponse = await axios.patch(`${PAYMENT_SERVICE_URL}/${paymentId}/refund`, {
      amount: amount
        //amount: returnRequest.refund_amount || estimatedAmount // handle nulls gracefully
});
    if (refundResponse.status !== 200) {
      throw new Error('Refund failed');
    }
    const oldStatus = returnRequest.status;


    // Update return request with refund status
    returnRequest.refund_status = 'INITIATED';
    returnRequest.status = 'REFUND_INITIATED';
    await returnRequest.save();


    // Audit log for refund initiation
    await ReturnAuditLog.create({
      return_id: returnRequest.return_id,
      old_status: oldStatus,
      new_status: 'REFUND_INITIATED',
      changed_by: 'SYSTEM'
    });

    return returnRequest;
  } catch (error) {
    console.error('Refund initiation error:', error.message);
    returnRequest.refund_status = 'FAILED';
    await returnRequest.save();
    throw error;
  }
}

  // 5. Handle Pickup Update in Shipping Service
  async updatePickupStatus(returnId) {
    const returnRequest = await ReturnRequest.findByPk(returnId);
    if (!returnRequest) {
      throw new Error('Return request not found');
    }
    const orderItemDetails = await axios.get(`${ORDER_SERVICE_URL}/${returnRequest.order_id}/items/${returnRequest.order_item_id}`);
     const pickupAddress = orderItemDetails.data.shipping_address;
    // Trigger Shipping Service to create reverse pickup order
    const pickupResponse = await axios.post(`${SHIPPING_SERVICE_URL}/pickup`, {
      order_id: returnRequest.order_id,
      order_item_id: returnRequest.order_item_id,
       pickup_address: pickupAddress
    });

    if (pickupResponse.status === 200) {
      returnRequest.status = 'PICKED_UP';
      await returnRequest.save();
    }

    return returnRequest;
  }

  // 6. Upload Return Attachments
  async uploadReturnAttachment(returnId, fileUrl, fileType, uploadedBy) {
    const attachment = await ReturnAttachment.create({
      return_id: returnId,
      file_url: fileUrl,
      file_type: fileType,
      uploaded_by: uploadedBy
    });

    return attachment;
  }

  async markReturnAsRefunded(paymentId, changedBy, note) {
  // Find return request associated with this payment
  const returnRequest = await ReturnRequest.findOne({
    where: { payment_id: paymentId }
  });

  if (!returnRequest) {
    throw new Error(`Return request not found for payment ID: ${paymentId}`);
  }

  const oldStatus = returnRequest.status;
  returnRequest.status = 'REFUNDED';
  returnRequest.refund_status = 'SUCCESS';
  await returnRequest.save();

  await ReturnAuditLog.create({
    return_id: returnRequest.return_id,
    old_status: oldStatus,
    new_status: 'REFUNDED',
    changed_by: changedBy,
    note
  });

  return returnRequest;
}
}


module.exports = new ReturnService();
