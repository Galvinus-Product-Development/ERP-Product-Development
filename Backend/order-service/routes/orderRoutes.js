const express = require('express');
const router = express.Router();
const { body, param } = require('express-validator');
const orderController = require('../controllers/orderController');
const { validate } = require('../middlewares/validate'); 
const { createOrderValidator, updateOrderStatusValidator, updateOrderItemStatusValidator } = require('../validators/orderValidator');

console.log('Loaded orderController:', orderController); 
router.post('/',
    createOrderValidator,
    validate,
    orderController.createOrder
);

router.get('/:order_id',
    param('order_id').isUUID(),
    validate,
    orderController.getOrderById
);

router.patch('/:order_id/status',
    updateOrderStatusValidator,
    validate,
    orderController.updateOrderStatus
);

router.post('/:order_id/notes',
    param('order_id').isUUID(),
    body('note').notEmpty(),
    validate,
    orderController.addOrderNote
);

router.get('/', orderController.listOrders);
router.get('/:order_id/items/:order_item_id', orderController.getOrderItemDetails);
router.patch('/order-items/:order_item_id/status', orderController.updateOrderItemStatus);
router.patch('/orders/:order_id/evaluate-status', orderController.evaluateOrderStatus);
router.patch('/order-items/:order_item_id/refund',
    body('changed_by').optional().isString(),
    validate,
    orderController.markItemAsRefunded
);


module.exports = router;
