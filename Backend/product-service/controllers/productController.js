const productService = require('../services/productService');
const { validationResult } = require('express-validator');

class ProductController {
  
  // Create new product
  async createProduct(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          success: false,
          message: 'Validation errors',
          errors: errors.array()
        });
      }
      
      const productData = req.body;
      const imageFiles = req.files || [];
      
      const product = await productService.createProduct(productData, imageFiles);
      
      res.status(201).json({
        success: true,
        message: 'Product created successfully',
        data: product
      });
      
    } catch (error) {
      console.error('Error creating product:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to create product',
        error: error.message
      });
    }
  }
  
  // Add product variant
  async addProductVariant(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          success: false,
          message: 'Validation errors',
          errors: errors.array()
        });
      }
      
      const { productId } = req.params;
      const variantData = req.body;
      
      const variant = await productService.createProductVariant(productId, variantData);
      
      res.status(201).json({
        success: true,
        message: 'Product variant created successfully',
        data: variant
      });
      
    } catch (error) {
      console.error('Error creating product variant:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to create product variant',
        error: error.message
      });
    }
  }
  
  // Upload variant images
  async uploadVariantImages(req, res) {
    try {
      const { productItemId } = req.params;
      const imageFiles = req.files || [];
      
      if (imageFiles.length === 0) {
        return res.status(400).json({
          success: false,
          message: 'No images provided'
        });
      }
      
      const images = await productService.uploadVariantImages(productItemId, imageFiles);
      
      res.status(201).json({
        success: true,
        message: 'Variant images uploaded successfully',
        data: images
      });
      
    } catch (error) {
      console.error('Error uploading variant images:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to upload variant images',
        error: error.message
      });
    }
  }
  
  // Get product by ID
  async getProduct(req, res) {
    try {
      const { productId } = req.params;
      
      const product = await productService.getProductById(productId);
      
      if (!product) {
        return res.status(404).json({
          success: false,
          message: 'Product not found'
        });
      }
      
      res.json({
        success: true,
        data: product
      });
      
    } catch (error) {
      console.error('Error fetching product:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to fetch product',
        error: error.message
      });
    }
  }
  
  // Get all products
  async getAllProducts(req, res) {
    try {
      const { page = '1', limit = '10', ...filters } = req.query;
      
      const result = await productService.getAllProducts(
        parseInt(page),
        parseInt(limit),
        filters
      );
      
      res.json({
        success: true,
        data: result.products,
        pagination: result.pagination
      });
      
    } catch (error) {
      console.error('Error fetching products:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to fetch products',
        error: error.message
      });
    }
  }
  
  // Get product variant
  async getProductVariant(req, res) {
    try {
      const { variantId } = req.params;
      
      const variant = await productService.getProductVariantById(variantId);
      
      if (!variant) {
        return res.status(404).json({
          success: false,
          message: 'Product variant not found'
        });
      }
      
      res.json({
        success: true,
        data: variant
      });
      
    } catch (error) {
      console.error('Error fetching product variant:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to fetch product variant',
        error: error.message
      });
    }
  }
}

module.exports = new ProductController();
// class ProductController {

//   // Add a new product along with its initial variant
//   static async addProduct(req, res) {
//     const { productData, variantData } = req.body;

//     try {
//       const result = await ProductService.addProduct(productData, variantData);
//       res.status(201).json({
//         success: true,
//         message: "Product added successfully",
//         data: {
//             product: { product_id: result.product.product_id },
//             product_item: { product_item_id: result.productItem.product_item_id }
//         }
//     });
//       } catch (error) {
//       res.status(500).json({ success: false, message: error.message });
//     }
//   } 

//   // Get all products with variants and images
//   static async getAllProducts(req, res, next) {
//     try {
//       const products = await ProductService.getAllProducts();
//       res.status(200).json({
//         success: true,
//         message: "Products fetched successfully.",
//         data: products,
//       });
//     } catch (error) {
//       console.error("❌ Error fetching products:", error.message);
//       res.status(500).json({ success: false, message: error.message }); // Return error response
//       return next(error);
//     }
//   }

//   // Retrieve a product along with all its variants
//   static async getProduct(req, res) {
//     const { product_id } = req.params;

//     try {
//       const result = await ProductService.getProduct(product_id);
//       res.status(200).json({ message: "Product retrieved successfully", data: result });
//     } catch (error) {
//       res.status(404).json({ message: error.message });
//     }
//   }

//   // Update a product
//   static async updateProduct(req, res) {
//     const { product_id } = req.params;
//     const updatedData = req.body;

//     try {
//       const result = await ProductService.updateProduct(product_id, updatedData);
//       res.status(200).json({ message: "Product updated successfully", data: result });
//     } catch (error) {
//       res.status(500).json({ message: error.message });
//     }
//   }
//    // GET all product statuses
//    static async getProductStatuses(req, res) {
//     try {
//       const statuses = await ProductService.getProductStatuses();
//       res.status(200).json(statuses);
//     } catch (error) {
//       console.error("Error fetching product statuses:", error);
//       res.status(500).json({ error: "Failed to fetch product statuses" });
//     }
//   }

//   // Delete or restore a product
//   static async deleteRestoreProduct(req, res) {
//     const { product_id } = req.params;
//     const { restore } = req.query;

//     try {
//       const result = await ProductService.deleteRestoreProduct(product_id, restore === 'true');
//       res.status(200).json(result);
//     } catch (error) {
//       res.status(500).json({ message: error.message });
//     }
//   }
//   // Get products by category name
// static async getProductsByCategory(req, res) {
//   const { category_name } = req.params;

//   try {
//     const products = await ProductService.getProductsByCategory(category_name);
//     res.status(200).json({
//       success: true,
//       message: `Products fetched for category: ${category_name}`,
//       data: products
//     });
//   } catch (error) {
//     console.error("❌ Error fetching products by category:", error.message);
//     res.status(500).json({ success: false, message: error.message });
//   }
// }

// }

// module.exports = ProductController;
