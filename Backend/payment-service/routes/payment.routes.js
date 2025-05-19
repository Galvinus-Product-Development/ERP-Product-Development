// routes/payment.routes.js
const express = require('express');
const { initiatePayment } = require('../controllers/payment.controller');
const { processRefund } = require('../controllers/refund.controller');
const { getPaymentByOrderId } = require('../controllers/payment.controller');

//const { handleWebhook } = require('../webhooks/razorpay.webhook');
const router = express.Router();

router.post('/initiate', initiatePayment);
router.patch('/:paymentId/refund', processRefund);
router.get('/by-order/:orderId', getPaymentByOrderId);

//router.post('/webhook', express.raw({ type: 'application/json' }), handleWebhook);

module.exports = router;
