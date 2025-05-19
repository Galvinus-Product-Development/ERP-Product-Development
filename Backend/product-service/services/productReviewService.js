const { ProductReview } = require("../models");
const redisClient = require("../config/redis");

// Create a product review
const addProductReview = async (reviewData) => {
  return await ProductReview.create(reviewData);
};

// Get all reviews for a product
const getReviewsByProduct = async (product_id) => {
  return await ProductReview.findAll({
    where: { product_id },
    
  });
};

// Get a single review by ID
const getReviewById = async (review_id) => {
  return await ProductReview.findByPk(review_id);
};

// Update a product review(Only by the owner)
const updateProductReview = async (review_id, user_id, updatedData) => {
  return await ProductReview.update(updatedData, {
    where: { review_id, user_id, },
  });
};

// Delete a product review(Only by the owner)
const deleteProductReview = async (review_id, user_id) => {
  return await ProductReview.destroy({ where: { review_id, user_id } });
};

module.exports = {
  addProductReview,
  getReviewsByProduct,
  getReviewById,
  updateProductReview,
  deleteProductReview,
};