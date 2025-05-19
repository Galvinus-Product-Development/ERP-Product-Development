const ratingProductService = require("../services/ratingProductService");

exports.addProductRating = async (req, res) => {
  try {
    const rating = await ratingProductService.addProductRating(req.body);
    res.status(201).json({ message: "Rating added successfully", rating });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getRatingsByProduct = async (req, res) => {
  try {
    const { product_id } = req.params;
    const ratings = await ratingProductService.getRatingsByProduct(product_id);
    res.status(200).json(ratings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateProductRating = async (req, res) => {
  try {
    const { rating_product_id, product_id, user_id, rating_type_id } = req.params;
    const { rating_value } = req.body;
    if (!rating_product_id) {
      return res.status(400).json({ error: "rating_product_id is required." });
    }
    await ratingProductService.updateProductRating(rating_product_id, product_id, user_id, rating_type_id, rating_value);
    res.status(200).json({ message: "Rating updated successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteProductRating = async (req, res) => {
  try {
    const {rating_product_id, product_id, user_id, rating_type_id } = req.params;
    if (!rating_product_id) {
      return res.status(400).json({ error: "rating_product_id is required." });
    }
    await ratingProductService.deleteProductRating(rating_product_id, product_id, user_id, rating_type_id);
    res.status(200).json({ message: "Rating deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
