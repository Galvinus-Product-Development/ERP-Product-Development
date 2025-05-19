const { OrderPayment, OrderPaymentLog, PaymentAuditLog, OrderPaymentGatewayDetail } = require('../models');
const { refundRazorpayPayment } = require('../services/razorpay.service');

exports.processRefund = async (req, res) => {
  const { paymentId } = req.params;
  const { amount } = req.body;

  if (!amount) {
    return res.status(400).json({ error: 'Refund amount is required' });
  }

  try {
    const payment = await OrderPayment.findByPk(paymentId);
    if (!payment) return res.status(404).json({ error: 'Payment not found' });

    const gatewayDetails = await OrderPaymentGatewayDetail.findOne({
      where: { payment_id: paymentId },
    });
    if (!gatewayDetails || !gatewayDetails.gateway_payment_id) {
      return res.status(404).json({ error: 'Razorpay Payment ID not found for this payment' });
    }

    const refund = await refundRazorpayPayment(gatewayDetails.gateway_payment_id, amount);

    // Update status to REFUNDED
    const oldStatus = payment.status;
    await payment.update({ status: 'REFUNDED' });

    await OrderPaymentLog.create({
      payment_id: paymentId,
      status: 'REFUNDED',
      log_message: `Refund of ₹${amount} initiated.`,
    });

    await PaymentAuditLog.create({
      payment_id: paymentId,
      old_status: oldStatus,
      new_status: 'REFUNDED',
      changed_by: 'RETURN_SERVICE',
    });

    return res.status(200).json({
      message: 'Refund initiated successfully',
      refund_id: refund.id,
      status: refund.status,
    });
  } catch (err) {
    console.error('Refund Error:', err);
    return res.status(500).json({ error: 'Refund processing failed', details: err.message });
  }
};
