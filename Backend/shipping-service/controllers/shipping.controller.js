const shippingService = require('../services/shipping.service');

exports.create = async (req, res) => {
  try {
    const result = await shippingService.createShippingOrder(req.body);
    res.status(201).json(result);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};

exports.updateStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { new_status, changed_by } = req.body;
    const result = await shippingService.updateShippingStatus(id, new_status, changed_by);
    res.json(result);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};

exports.getByOrder = async (req, res) => {
  try {
    const result = await shippingService.getShippingByOrder(req.params.orderId);
    res.json(result);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};

exports.getById = async (req, res) => {
  try {
    const result = await shippingService.getShippingById(req.params.id);
    if (!result) return res.status(404).send('Not found');
    res.json(result);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};

exports.getTrackingDetails = async (req, res) => {
  try {
    const { orderId, itemId } = req.params;
    const trackingData = await shippingService.getTrackingDetails(orderId, itemId);
    res.json(trackingData);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};
exports.createReversePickup = async (req, res) => {
  try {
    const result = await shippingService.createReversePickup(req.body);
    res.status(201).json(result);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};


