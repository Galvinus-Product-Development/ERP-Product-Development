const express = require('express');
const controller = require('../controllers/shipping.controller');

const router = express.Router();

router.post('/', controller.create);
router.patch('/:id/status', controller.updateStatus);
router.get('/order/:orderId', controller.getByOrder);
router.get('/:id', controller.getById);
router.get('/tracking/:orderId/:itemId', controller.getTrackingDetails);
router.post('/pickup', controller.createReversePickup); // Add this to router



module.exports = router;
