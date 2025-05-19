// services/productItemService.js

const db = require("../models");
const sequelize = db.sequelize;
const { ProductItem, Product, ProductImage, Colour, SizeOption } = db;
//const { Op } = require("sequelize");
////const { options } = require("../routes/productRoutes");

class ProductItemService {

  // Add a new variant (ProductItem) for a product
  static async addProductItem(product_id, variantData, transaction = null) {
    try {
      //const options = transaction ? { transaction } : {};
      const product = await Product.findByPk(product_id);
      if (!product) throw new Error(`Product not found with ID: ${product_id}`);

      // Ensure data is properly structured and defined
      const originalPrice = variantData.original_price ? parseFloat(variantData.original_price).toFixed(2) : "0.00";
      const discountApplicable = variantData.discount_applicable ? parseFloat(variantData.discount_applicable).toFixed(2) : "0.00";
      const salePrice = variantData.sale_price ? parseFloat(variantData.sale_price).toFixed(2) : originalPrice;

      const productItem = await ProductItem.create({
        product_id,
        colour_id: variantData.colour_id,  
        size_id: variantData.size_id,      
        original_price: parseFloat(originalPrice),  // Store as decimal
        discount_applicable: parseFloat(discountApplicable),  // Store as decimal
        sale_price: parseFloat(salePrice),  // Store as decimal
        qty_in_stocks: variantData.qty_in_stocks,  // ✅ Corrected
        //status: variantData.status || 'available'
      }, { transaction });

      console.log("✅ Product Item created successfully:", productItem.product_item_id);
      return productItem;
    } catch (error) {
      console.error("❌ Error adding product item:", error.message);
      throw new Error(error.message);
    }
  }

  // Retrieve all variants for a specific product
  static async getProductItems(product_id) {
    try {
      const productItems = await ProductItem.findAll({
        where: { product_id },
        include: [
          { model: ProductImage, attributes: ["image_id", "image_url"] },
          { model: Colour, attributes: ["colour_id", "colour_name"] },  // ✅ Added Colour association
          { model: SizeOption, attributes: ["size_id", "size_name"] },  // ✅ Added SizeOption association
          {
            model: Product,
            attributes: ["product_id", "product_name"]
          },
        ]
      });
      
      console.log("✅ Retrieved product items successfully");
      return productItems;
    } catch (error) {
      console.error("❌ Error retrieving product items:", error.message);
      throw new Error(error.message);
    }
  }
    // Retrieve a specific product item by ID
    static async getProductItemById(product_item_id) {
      try {
        const productItem = await ProductItem.findOne({
          where: { product_item_id },
          include: [
            { model: ProductImage, attributes: ["image_id", "image_url"] },
            { model: Colour, attributes: ["colour_id", "colour_name"] },
            { model: SizeOption, attributes: ["size_id", "size_name"] },
           {
              model: Product,
              attributes: ["product_id", "product_name"]
            }
          ]
        });
  
        if (!productItem) throw new Error(`Product item not found with ID: ${product_item_id}`);
        
        console.log("✅ Product Item retrieved successfully:", product_item_id);
        return productItem;
      } catch (error) {
        console.error("❌ Error retrieving product item:", error.message);
        throw new Error(error.message);
      }
    }
  

  // Update a specific variant
  static async updateProductItem(product_item_id, updatedData, transaction = null) {
    try {
      const productItem = await ProductItem.findByPk(product_item_id);
      if (!productItem) throw new Error(`Product item not found with ID: ${product_item_id}`);

      await productItem.update(updatedData, { transaction });

      console.log("✅ Product Item updated successfully");
      return productItem;
    } catch (error) {
      console.error("❌ Error updating product item:", error.message);
      throw new Error(error.message);
    }
  }

  // Delete a specific variant
  static async deleteProductItem(product_item_id, transaction = null) {
    try {
      const productItem = await ProductItem.findByPk(product_item_id);
      if (!productItem) throw new Error(`Product item not found with ID: ${product_item_id}`);

      await productItem.destroy({ transaction });

      console.log("✅ Product Item deleted successfully");
    } catch (error) {
      console.error("❌ Error deleting product item:", error.message);
      throw new Error(error.message);
    }
  }
}

module.exports = ProductItemService;

/*const db = require("../models"); 
const sequelize = db.sequelize;
const {ProductItem} = require("../models");
const {Product} = require("../models/Product");
const {Colour} = require("../models/Colour");
const {SizeOption} = require("../models/SizeOption");

/**
 * Add a new ProductItem (variant)
 
const addProductItem = async (data) => {
  try {
    const { product_id, colour_id, size_id, original_price, discount_applicable, sale_price, qty_in_stocks } = data;

    // Validate product existence
    const product = await Product.findByPk(product_id);
    if (!product) throw new Error("Product not found");

    // Validate colour existence
    if (colour_id) {
      const colour = await Colour.findByPk(colour_id);
      if (!colour) throw new Error("Colour not found");
    }

    // Validate size existence
    if (size_id) {
      const size = await SizeOption.findByPk(size_id);
      if (!size) throw new Error("Size option not found");
    }

    const productItem = await ProductItem.create({
      product_id,
      colour_id,
      size_id,
      original_price,
      discount_applicable,
      sale_price,
      qty_in_stocks,
    });

    return productItem;
  } catch (error) {
    throw error;
  }
};

/**
 * Update stock and price of a ProductItem
 
const updateProductItem = async (product_item_id, updates) => {
  try {
    const productItem = await ProductItem.findByPk(product_item_id);
    if (!productItem) throw new Error("ProductItem not found");

    await productItem.update(updates);
    return productItem;
  } catch (error) {
    throw error;
  }
};

/**
 * Fetch ProductItems by product_id
 
const getProductItemsByProductId = async (product_id) => {
  try {
    const productItems = await ProductItem.findAll({
      where: { product_id },
      include: [
        { model: Colour, attributes: ["colour_id", "colour_name"] },
        { model: SizeOption, attributes: ["size_id", "size_name"] },
      ],
    });

    return productItems;
  } catch (error) {
    throw error;
  }
};

/**
 * Delete/restore a ProductItem
 
const deleteRestoreProductItem = async (product_item_id, restore = false) => {
  try {
    const productItem = await ProductItem.findByPk(product_item_id, { paranoid: false });

    if (!productItem) throw new Error("ProductItem not found");

    if (restore) {
      await productItem.restore();
    } else {
      await productItem.destroy();
    }

    return { message: restore ? "ProductItem restored" : "ProductItem deleted" };
  } catch (error) {
    throw error;
  }
};

module.exports = {
  addProductItem,
  updateProductItem,
  getProductItemsByProductId,
  deleteRestoreProductItem,
};

*/
