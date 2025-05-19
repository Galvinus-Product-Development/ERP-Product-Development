const orderService = require('../services/orderService');
const { OrderItem } = require('../models');


// Create new order
exports.createOrder = async (req, res) => {
    try {
        const order = await orderService.createOrder(req.body);
        res.status(201).json(order);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get order by ID
exports.getOrderById = async (req, res) => {
    try {
        const order = await orderService.getOrderById(req.params.order_id);
        if (!order) return res.status(404).json({ message: 'Order not found' });
        res.json(order);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update order status
exports.updateOrderStatus = async (req, res) => {
    try {
        const order = await orderService.updateOrderStatus(req.params.order_id, req.body.status, req.body.changed_by);
        res.json(order);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
/*exports.updateOrderItemStatus = async (req, res) => {
    try {
        const updatedItem = await orderService.updateOrderItemStatus(
            req.params.order_item_id,
            req.body.status,
            req.body.changed_by
        );
        res.json(updatedItem);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};*/

// Add note to order
exports.addOrderNote = async (req, res) => {
    try {
        const note = await orderService.addOrderNote(req.params.order_id, req.body.note, req.body.created_by);
        res.status(201).json(note);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// List orders with optional filters (by user, status, etc.)
exports.listOrders = async (req, res) => {
    try {
        const orders = await orderService.listOrders(req.query);
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.getOrderItemDetails = async (req, res) => {
    try {
      const { order_id, order_item_id } = req.params;
      const orderItem = await OrderItem.findOne({ where: { order_id, order_item_id } });
      if (!orderItem) return res.status(404).json({ error: 'Order Item not found' });
      res.json(orderItem);
    } catch (e) {
      res.status(400).json({ error: e.message });
    }
  };
  exports.updateOrderItemStatus = async (req, res) => {
    try {
      const { order_item_id } = req.params;
      const { newStatus, changedBy } = req.body;
  
      const updatedItem = await orderService.updateOrderItemStatus(order_item_id, newStatus, changedBy);
  
      res.json(updatedItem);
    } catch (e) {
      res.status(400).json({ error: e.message });
    }
  };
  exports.evaluateOrderStatus = async (req, res) => {
    try {
      const { order_id } = req.params;
      const result = await orderService.evaluateOrderStatus(order_id);
      res.json(result);
    } catch (e) {
      res.status(400).json({ error: e.message });
    }
  };

  exports.markItemAsRefunded = async (req, res) => {
    try {
        const { order_item_id } = req.params;
        const changedBy = req.body.changed_by || 'PAYMENT_SERVICE';

        const updatedItem = await orderService.updateOrderItemStatus(order_item_id, 'REFUNDED', changedBy);

        // Evaluate parent order status automatically
        await orderService.evaluateOrderStatus(updatedItem.order_id);

        res.json({ message: 'Order item marked as REFUNDED', item: updatedItem });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

  
  