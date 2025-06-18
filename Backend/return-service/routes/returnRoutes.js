const express = require('express');
const returnController = require('../controllers/returnController');
const router = express.Router();

// 1. Create Return Request
router.post('/returns', returnController.createReturnRequest);

// 2. Approve Return Request
router.patch('/returns/:returnId/approve', returnController.approveReturnRequest);

// 3. Trigger Refund
router.patch('/returns/:returnRequestId/refund/:paymentId', returnController.triggerRefund);

// 4. Update Pickup Status
router.patch('/returns/:returnId/pickup', returnController.updatePickupStatus);

// 5. Upload Attachment
router.post('/returns/:returnId/attachments', returnController.uploadAttachment);

// 6. Mark Return as Refunded (webhook trigger)
router.patch('/payment/:paymentId/mark-refunded', returnController.markReturnAsRefunded);


module.exports = router;
