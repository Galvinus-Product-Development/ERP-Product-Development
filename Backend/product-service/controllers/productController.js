const ProductService = require("../services/productService");

class ProductController {

  // Add a new product along with its initial variant
  static async addProduct(req, res) {
    const { productData, variantData } = req.body;

    try {
      const result = await ProductService.addProduct(productData, variantData);
      res.status(201).json({
        success: true,
        message: "Product added successfully",
        data: {
            product: { product_id: result.product.product_id },
            product_item: { product_item_id: result.productItem.product_item_id }
        }
    });
      } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  } 

  // Get all products with variants and images
  static async getAllProducts(req, res, next) {
    try {
      const products = await ProductService.getAllProducts();
      res.status(200).json({
        success: true,
        message: "Products fetched successfully.",
        data: products,
      });
    } catch (error) {
      console.error("❌ Error fetching products:", error.message);
      res.status(500).json({ success: false, message: error.message }); // Return error response
      return next(error);
    }
  }

  // Retrieve a product along with all its variants
  static async getProduct(req, res) {
    const { product_id } = req.params;

    try {
      const result = await ProductService.getProduct(product_id);
      res.status(200).json({ message: "Product retrieved successfully", data: result });
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  }

  // Update a product
  static async updateProduct(req, res) {
    const { product_id } = req.params;
    const updatedData = req.body;

    try {
      const result = await ProductService.updateProduct(product_id, updatedData);
      res.status(200).json({ message: "Product updated successfully", data: result });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
   // GET all product statuses
   static async getProductStatuses(req, res) {
    try {
      const statuses = await ProductService.getProductStatuses();
      res.status(200).json(statuses);
    } catch (error) {
      console.error("Error fetching product statuses:", error);
      res.status(500).json({ error: "Failed to fetch product statuses" });
    }
  }

  // Delete or restore a product
  static async deleteRestoreProduct(req, res) {
    const { product_id } = req.params;
    const { restore } = req.query;

    try {
      const result = await ProductService.deleteRestoreProduct(product_id, restore === 'true');
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
  // Get products by category name
static async getProductsByCategory(req, res) {
  const { category_name } = req.params;

  try {
    const products = await ProductService.getProductsByCategory(category_name);
    res.status(200).json({
      success: true,
      message: `Products fetched for category: ${category_name}`,
      data: products
    });
  } catch (error) {
    console.error("❌ Error fetching products by category:", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
}

}

module.exports = ProductController;
