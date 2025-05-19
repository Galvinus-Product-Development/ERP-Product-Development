/*const shippingService = require("../services/shipping.service");

exports.handlePaymentStatus = async (req, res, next) => {
  try {
    const { paymentStatus, orderId } = req.body;

    if (paymentStatus === "PAID" && orderId) {
      const shippingResults = await shippingService.handleShippingForPaidOrder(orderId);
      return res.status(200).json({ message: "Shipping initiated", shipping: shippingResults });
    }

    res.status(400).json({ message: "Invalid payment status or missing orderId" });
  } catch (err) {
    next(err);
  }
};
*/