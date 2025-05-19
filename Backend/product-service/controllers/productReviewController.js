const productReviewService = require("../services/productReviewService");

exports.addProductReview = async (req, res) => {
  try {
    const review = await productReviewService.addProductReview(req.body);
    res.status(201).json({ message: "Review added successfully", review });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getReviewsByProduct = async (req, res) => {
  try {
    const { product_id } = req.params;
    const reviews = await productReviewService.getReviewsByProduct(product_id);
    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getReviewById = async (req, res) => {
  try {
    const { review_id } = req.params;
    const review = await productReviewService.getReviewById(review_id);
    if (!review) return res.status(404).json({ message: "Review not found" });
    res.status(200).json(review);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateProductReview = async (req, res) => {
  try {
    const { review_id, user_id  } = req.params;
    //const { user_id, user_id  } = req.body;
    const updatedData = req.body;
    const result = await productReviewService.updateProductReview(review_id, user_id, updatedData);
    if (result[0] === 0) {
      return res.status(403).json({ message: "Unauthorized or review not found" });
    }
    res.status(200).json({ message: "Review updated successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteProductReview = async (req, res) => {
  try {
    const { review_id, user_id  } = req.params;
    //const { } = req.body;
    const result = await productReviewService.deleteProductReview(review_id, user_id);
    if (result === 0) {
      return res.status(403).json({ message: "Unauthorized or review not found" });
    }
    res.status(200).json({ message: "Review deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};