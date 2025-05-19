const returnService = require('../services/returnService');

class ReturnController {
  // 1. Create Return Request
  async createReturnRequest(req, res) {
    try {
      const { orderId, orderItemId, userId, reason } = req.body;
      const returnRequest = await returnService.createReturnRequest(orderId, orderItemId, userId, reason);
      res.status(201).json(returnRequest);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  // 2. Approve Return Request
  async approveReturnRequest(req, res) {
    try {
      const { returnId } = req.params;
      const { changedBy } = req.body;
      const returnRequest = await returnService.approveReturnRequest(returnId, changedBy);
      res.status(200).json(returnRequest);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  // 3. Trigger Refund
  async triggerRefund(req, res) {
    try {
      const { returnRequestId, paymentId } = req.params;
      const returnRequest = await returnService.triggerRefund(returnRequestId, paymentId);
      res.status(200).json(returnRequest);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  // 4. Update Pickup Status
  async updatePickupStatus(req, res) {
    try {
      const { returnId } = req.params;
      const returnRequest = await returnService.updatePickupStatus(returnId);
      res.status(200).json(returnRequest);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  // 5. Upload Attachment
  async uploadAttachment(req, res) {
    try {
      const { returnId } = req.params;
      const { fileUrl, fileType, uploadedBy } = req.body;
      const attachment = await returnService.uploadReturnAttachment(returnId, fileUrl, fileType, uploadedBy);
      res.status(201).json(attachment);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
  // 6. Mark Return as Refunded (from Razorpay webhook)
async markReturnAsRefunded(req, res) {
  try {
    const { paymentId } = req.params;
    const { changed_by, note } = req.body;
    const updatedReturn = await returnService.markReturnAsRefunded(paymentId, changed_by, note);
    res.status(200).json({ message: 'Return marked as refunded', return: updatedReturn });
  } catch (error) {
    console.error("❌ Error in markReturnAsRefunded:", error.message);
    res.status(500).json({ error: error.message });
  }
}

}

module.exports = new ReturnController();
