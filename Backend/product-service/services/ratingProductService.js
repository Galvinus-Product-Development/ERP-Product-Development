const {RatingProduct} = require("../models");

// Add a rating for a product
const addProductRating = async (ratingData) => {
  return await RatingProduct.create(ratingData);
};

// Get all ratings for a specific product
const getRatingsByProduct = async (product_id) => {
  return await RatingProduct.findAll({ where: { product_id } });
};

// Update rating value
const updateProductRating = async (rating_product_id, product_id, user_id, rating_type_id, rating_value) => {
  return await RatingProduct.update(
    { rating_value },
    { where: { rating_product_id, product_id, user_id, rating_type_id } }
  );
};

// Delete a rating
const deleteProductRating = async (rating_product_id, product_id, user_id, rating_type_id) => {
  return await RatingProduct.destroy({ where: { rating_product_id, product_id, user_id, rating_type_id } });
};

module.exports = {
  addProductRating,
  getRatingsByProduct,
  updateProductRating,
  deleteProductRating,
};
