const {
    Discount,
    ProductDiscount,
    CategoryDiscount,
    ProductItem,
    ProductCategory,
  } = require("../models");
  
  async function getApplicableDiscounts(productItemId) {
    const productItem = await ProductItem.findByPk(productItemId, {
      include: {
        model: Product,
        include: ProductCategory
      }
    });
  
    if (!productItem) return [];
  
    const categoryId = productItem.Product?.ProductCategory?.id;
  
    // Discounts directly on product item
    const itemDiscounts = await Discount.findAll({
      include: [{
        model: ProductItem,
        where: { id: productItemId },
        through: { attributes: [] }
      }]
    });
  
    // Discounts via category
    const categoryDiscounts = categoryId ? await Discount.findAll({
      include: [{
        model: ProductCategory,
        where: { id: categoryId },
        through: { attributes: [] }
      }]
    }) : [];
  
    return [...itemDiscounts, ...categoryDiscounts];
  }
  
  module.exports = {
    getApplicableDiscounts
  };
  