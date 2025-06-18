// controllers/payment.controller.js
const { OrderPayment, OrderPaymentGatewayDetail } = require('../models');
const { createRazorpayOrder } = require('../services/razorpay.service');
const { v4: uuidv4 } = require('uuid');

exports.initiatePayment = async (req, res) => {
  try {

    console.log("🔔 Initiate Payment Called with Body:", req.body);

    const { order_id, amount, payment_method } = req.body;

    const payment = await OrderPayment.create({
      id: uuidv4(),
      order_id,
      amount,
      payment_method,
      status: 'PENDING',
    });

    const razorpayOrder = await createRazorpayOrder(amount, "INR", order_id);

    await OrderPaymentGatewayDetail.create({
      payment_id: payment.id,
      gateway_name: 'RAZORPAY',
      gateway_order_id: razorpayOrder.id,
      gateway_response: razorpayOrder,
    });

    res.status(200).json({
      payment_id: payment.id,
      razorpay_order_id: razorpayOrder.id,
      amount,
      currency: "INR",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Payment initiation failed." });
  }
};

exports.getPaymentByOrderId = async (req, res) => {
  try {
    const payment = await OrderPayment.findOne({
      where: { order_id: req.params.orderId, status: 'SUCCESS' },
    });

    if (!payment) return res.status(404).json({ message: "Payment not found" });

    res.json(payment);
  } catch (err) {
    console.error("Error fetching payment:", err.message);
    res.status(500).json({ error: "Internal server error" });
  }
};
