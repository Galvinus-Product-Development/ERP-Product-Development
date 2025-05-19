const DiscountService = require("../services/DiscountService");

const getDiscounts = async (req, res) => {
  try {
    const { productItemId } = req.params;
    const discounts = await DiscountService.getDiscountsForProduct(productItemId);
    res.json(discounts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { getDiscountsForProductItem };
