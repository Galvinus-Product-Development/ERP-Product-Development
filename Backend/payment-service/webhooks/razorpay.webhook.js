// webhooks/razorpay.webhook.js
const crypto = require('crypto');
const {
  OrderPayment, OrderPaymentLog, PaymentAuditLog, OrderPaymentGatewayDetail,
} = require('../models');
const axios = require('axios');
const ORDER_SERVICE_URL = process.env.ORDER_SERVICE_URL;
const RETURN_SERVICE_URL = process.env.RETURN_SERVICE_URL;

exports.handleWebhook = async (req, res) => {
  const secret = process.env.RAZORPAY_WEBHOOK_SECRET;

  const signature = req.headers['x-razorpay-signature'];
  const body = req.body;
  const expectedSignature = crypto
    .createHmac('sha256', secret)
    .update(body)
    .digest('hex');
    console.log("🔑 Signature:", signature);
console.log("🔑 Expected :", expectedSignature);


  if (signature !== expectedSignature) {
    console.log("❌ Signature mismatch");
    return res.status(400).send('Invalid signature');
  }

  const event = JSON.parse(body.toString()); 
   console.log("📨 Webhook Event Received:", event.event);

  if (event.event === "payment.captured") {
    const { order_id, id: payment_id } = event.payload.payment.entity;
    try {
        const gatewayOrder = await OrderPaymentGatewayDetail.findOne({ where: { gateway_order_id: order_id } });
        
        if (!gatewayOrder) {
            return res.status(404).json({ message: "Gateway Order not found." });
          }

        const payment = await OrderPayment.findByPk(gatewayOrder.payment_id);
        const oldStatus = payment.status;

        await payment.update({
            status: "SUCCESS",
            transaction_id: payment_id,
        });

        await OrderPaymentLog.create({
            payment_id: payment.id,
            status: "SUCCESS",
            log_message: "Payment captured by Razorpay",
        });

        await PaymentAuditLog.create({
            payment_id: payment.id,
            old_status: oldStatus,
            new_status: "SUCCESS",
        });

      try {
        await axios.patch(`${ORDER_SERVICE_URL}/${payment.order_id}/status`, {
          status: 'PAID',
          changed_by: 'PAYMENT_SERVICE',
          note: 'Payment successfully captured via Razorpay.'
        });

        console.log(`Order ${payment.order_id} updated to PAID in OrderService.`);
      } catch (orderErr) {
        console.error("Failed to update order status in OrderService:", orderErr.message);
      }

      // Step 2: Fetch order items
      try {
        const orderResponse = await axios.get(`${ORDER_SERVICE_URL}/${payment.order_id}`);
        const orderItems = orderResponse.data.OrderItems || [];

        // Step 3: Mark each OrderItem as PAID
        await Promise.all(orderItems.map(async item => {
            try {
                await axios.patch(`${ORDER_SERVICE_URL}/order-items/${item.order_item_id}/status`, {
                  newStatus: 'PAID',
                  changedBy: 'PAYMENT_SERVICE',
                  note: 'Order item marked PAID after full payment.'
                });
              } catch (err) {
                console.error(`Failed to update item ${item.order_item_id}:`, err.message);
              }
            }));

        console.log(`Order items for item ${payment.order_id} updated to PAID.`);
      } catch (itemErr) {
        console.error("Failed to update order item statuses:", itemErr.message);
      }

      return res.status(200).json({ message: "Payment updated and order notified." });
    } catch (err) {
      console.error("Webhook processing error:", err.message);
      return res.status(500).json({ error: "Internal processing error." });
    }
  }
   if (event.event === "payment.refunded") {
    const refundEntity = event.payload.payment.entity;
    const gatewayPaymentId = refundEntity.id;

    try {
      const gatewayDetails = await OrderPaymentGatewayDetail.findOne({
        where: { gateway_payment_id: gatewayPaymentId }
      });

      if (!gatewayDetails) {
        console.log("🔍 No payment gateway detail found for refund.");
        return res.status(404).json({ error: "Payment not found for refund" });
      }

      const payment = await OrderPayment.findByPk(gatewayDetails.payment_id);
      const oldStatus = payment.status;

      await payment.update({ status: "REFUNDED" });

      await PaymentAuditLog.create({
        payment_id: payment.id,
        old_status: oldStatus,
        new_status: "REFUNDED",
        changed_by: "RAZORPAY_WEBHOOK",
      });

      console.log(`✅ Refund processed for payment ${payment.id}`);

      // Optionally notify ReturnService (if linked)
      try {
        await axios.patch(`${RETURN_SERVICE_URL}/payment/${payment.id}/mark-refunded`, {
          changed_by: "RAZORPAY_WEBHOOK",
          note: "Refund confirmed by Razorpay",
        });
        console.log(`✅ Notified ReturnService to mark return as REFUNDED.`);
      } catch (returnErr) {
        console.warn("⚠️ Failed to notify ReturnService:", returnErr.message);
      }

      return res.status(200).json({ message: "Refund status updated" });
    } catch (err) {
      console.error("❌ Refund webhook handling failed:", err.message);
      return res.status(500).json({ error: "Internal error in refund webhook" });
    }
  }

  return res.sendStatus(200);
};