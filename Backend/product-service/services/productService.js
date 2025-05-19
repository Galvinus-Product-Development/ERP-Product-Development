// services/productService.js
const db = require("../models");
const sequelize = db.sequelize;
const { Product, ProductItem, ProductCategory, Brand, Colour,SizeOption, ProductImage } = db;
const ProductItemService = require("./productItemService");  // Importing ProductItemService

class ProductService {

  // Add a new product along with its initial variant
  static async addProduct(productData, variantData, transaction = null) {
    try {
      
      // Create the Product entry first
      const product = await Product.create({
        product_name: productData .product_name,
        product_description: productData .product_description,
        product_category_id: productData .product_category_id,
        brand_id: productData .brand_id,
        status: productData .status || 'available'
      }, { transaction });

      console.log("✅ Product created successfully:", product.product_id);

      // Create the initial variant (ProductItem) using ProductItemService
      const productItem = await ProductItemService.addProductItem(
        product.product_id,
        variantData,
        transaction
      );

      console.log("✅ Initial Product Item created successfully for Product:", product.product_id);
      return { product, productItem };
      
    } catch (error) {
      console.error("❌ Error adding product:", error.message);
      throw new Error(error.message);
    }
  }

  // Retrieve a product along with all its variants
  static async getProduct(product_id) {
    try {
      const product = await Product.findByPk(product_id, {
        include: [
          { model: ProductCategory, attributes: ['product_category_id', 'category_name'] },
          { model: Brand, attributes: [ 'brand_id', 'brand_name'] },
        ]
      });

      if (!product) throw new Error(`Product not found with ID: ${product_id}`);

      // Fetching associated variants using ProductItemService
      const productItems = await ProductItemService.getProductItems(product_id);

      console.log("✅ Product retrieved successfully with variants.");
      return { product, productItems };
      
    } catch (error) {
      console.error("❌ Error retrieving product:", error.message);
      throw new Error(error.message);
    }
  }
  // Fetch all products with variants and images
static async getAllProducts() {
  try{
    const products = await Product.findAll({
    include: [
      { model: ProductCategory, attributes: ["category_name"] },
      { model: Brand, attributes: ["brand_name"] },
      {
        model: ProductItem,
        //required: true, // Ensures only products with at least one variant are fetched
        attributes: ["product_item_id", "original_price", "discount_applicable","sale_price", "qty_in_stocks"],
        include: [
          { model: Colour, attributes: ["colour_id", "colour_name"] },
          { model: SizeOption, attributes: ["size_id","size_name"] },
          { model: ProductImage, attributes: ["image_id", "image_url"], }, 
        ],
        // Order by stock quantity (highest first)
        //limit: 1, // Fetch only the highest-stock ProductItem for each product
      },
    ],
    order: [[ProductItem, "qty_in_stocks", "DESC"]],
  });

  console.log("✅ Products retrieved successfully.");
  return products;
} catch (error) {
  console.error("❌ Error fetching products:", error.message);
  throw new Error(error.message);
}
}


  // Update a product
  static async updateProduct(product_id, updatedData, transaction = null) {
    try {
      const product = await Product.findByPk(product_id);

      if (!product) throw new Error(`Product not found with ID: ${product_id}`);

      await product.update({
        product_name: updatedData.product_name,
        product_description: updatedData.product_description,
        product_category_id: updatedData.product_category_id,
        brand_id: updatedData.brand_id,
        status: updatedData.status
      }, { transaction });

      console.log("✅ Product updated successfully");
      return product;

    } catch (error) {
      console.error("❌ Error updating product:", error.message);
      throw new Error(error.message);
    }
  }
  // Fetch distinct product statuses
static async getProductStatuses() {
  try {
    const statuses = await Product.findAll({
      attributes: [
        [sequelize.fn("DISTINCT", sequelize.col("status")), "status"],
      ],
      raw: true, // Ensures only the status values are returned
    });

    return statuses.map((s) => s.status); // Extracting only status values
  } catch (error) {
    throw new Error("Failed to fetch product statuses");
  }
}

  // Delete or restore a product
  static async deleteRestoreProduct(product_id, restore = false, transaction = null) {
    try {
      const product = await Product.findByPk(product_id, { paranoid: false });

      if (!product) throw new Error(`Product not found with ID: ${product_id}`);

      if (restore) {
        await product.restore({ transaction });
        console.log("✅ Product restored successfully");
      } else {
        await product.destroy({ transaction });
        console.log("✅ Product deleted successfully");
      }

      return { message: restore ? "Product restored" : "Product deleted" };
      
    } catch (error) {
      console.error("❌ Error deleting/restoring product:", error.message);
      throw new Error(error.message);
    }
  }

  static async getProductsByCategory(category_name) {
    try {
      const products = await Product.findAll({
        include: [
          {
            model: ProductCategory,
            where: { category_name },
            attributes: ["category_name"]
          },
          { model: Brand, attributes: ["brand_name"] },
          {
            model: ProductItem,
            attributes: ["product_item_id", "original_price", "discount_applicable", "sale_price", "qty_in_stocks"],
            include: [
              { model: Colour, attributes: ["colour_id", "colour_name"] },
              { model: SizeOption, attributes: ["size_id", "size_name"] },
              { model: ProductImage, attributes: ["image_id", "image_url"] }
            ]
          }
        ],
        order: [[ProductItem, "qty_in_stocks", "DESC"]]
      });
  
      return products;
    } catch (error) {
      console.error("❌ Error in getProductsByCategory:", error.message);
      throw new Error("Failed to fetch products by category.");
    }
  }
  
}

module.exports = ProductService;
