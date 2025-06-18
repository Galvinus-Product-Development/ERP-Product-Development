const ProductItemService = require("../services/productItemService");

class ProductItemController {

  // Add a new product variant
  static async addProductItem(req, res) {
    const { product_id } = req.params;
    const variantData   = req.body;

    try {
      const productItem = await ProductItemService.addProductItem(product_id, variantData  );
      res.status(201).json({ message: "Product Item added successfully", data: productItem });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  // Retrieve all variants for a product
  static async getProductItems(req, res) {
    const { product_id } = req.params;

    try {
      const productItems = await ProductItemService.getProductItems(product_id);
      res.status(200).json({ data: productItems });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
  // Retrieve a specific product item by ID
  static async getProductItemById(req, res) {
    const { product_item_id } = req.params;

    try {
      const productItem = await ProductItemService.getProductItemById(product_item_id);
      res.status(200).json({ data: productItem });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  // Update a product variant
  static async updateProductItem(req, res) {
    const { product_item_id } = req.params;
    const updatedData = req.body;

    try {
      const result = await ProductItemService.updateProductItem(product_item_id, updatedData);
      res.status(200).json({ message: "Product Item updated successfully", data: result });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  // Delete a product variant
  static async deleteProductItem(req, res) {
    const { product_item_id } = req.params;

    try {
      await ProductItemService.deleteProductItem(product_item_id);
      res.status(200).json({ message: "Product Item deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}
module.exports = ProductItemController;