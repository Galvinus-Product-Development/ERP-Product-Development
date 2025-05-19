// services/razorpay.service.js
const razorpay = require('../config/razorpay.config');

exports.createRazorpayOrder = async (amount, currency = "INR", receipt) => {
  const options = {
    amount: amount * 100, // in paise
    currency,
    receipt,
  };
  const order = await razorpay.orders.create(options);
  return order;
};
exports.refundRazorpayPayment = async (razorpayPaymentId, amount) => {
  return razorpayInstance.payments.refund(razorpayPaymentId, {
    amount: amount * 100,
  });
};