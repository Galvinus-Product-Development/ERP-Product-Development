// services/productService.js
const db = require("../models");
const sequelize = db.sequelize;
const { Product, 
  ProductImage, 
  ProductItem, 
  ProductVariantImage,
  Brand,
  ProductCategory,
  Colour,
  SizeOption } = db;
const ProductItemService = require("./productItemService");  // Importing ProductItemService

class ProductService {
  
  // Create main product
  async createProduct(productData, imageFiles = []) {
    const transaction = await sequelize.transaction();
    
    try {
      // Map UI field names to database field names
      const mappedProductData = this.mapProductData(productData);
      
      // Create the main product
      const product = await Product.create(mappedProductData, { transaction });
      
      // Handle image uploads if provided
      if (imageFiles && imageFiles.length > 0) {
        await this.createProductImages(product.product_id, imageFiles, transaction);
      }
      
      await transaction.commit();
      
      // Return product with associations
      return await this.getProductById(product.product_id);
      
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }
  
  // Create product variant
  async createProductVariant(productId, variantData) {
    const transaction = await sequelize.transaction();
    
    try {
      // Verify product exists
      const product = await Product.findByPk(productId);
      if (!product) {
        throw new Error('Product not found');
      }
      
      // Create variant
      const variantDataWithProductId = {
        ...variantData,
        product_id: productId
      };
      
      const productItem = await ProductItem.create(variantDataWithProductId, { transaction });
      
      await transaction.commit();
      
      return await this.getProductVariantById(productItem.product_item_id);
      
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }
  
  // Upload variant images
  async uploadVariantImages(productItemId, imageFiles) {
    const transaction = await sequelize.transaction();
    
    try {
      // Verify product item exists
      const productItem = await ProductItem.findByPk(productItemId);
      if (!productItem) {
        throw new Error('Product variant not found');
      }
      
      // Create variant images
      const imagePromises = imageFiles.map((file, index) => {
        return ProductVariantImage.create({
          product_item_id: productItemId,
          image_url: file.path || file.url, // Adjust based on your file upload setup
          image_name: file.originalname || file.name,
          sort_order: index
        }, { transaction });
      });
      
      const images = await Promise.all(imagePromises);
      
      await transaction.commit();
      
      return images;
      
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }
  
  // Get product with all associations
  async getProductById(productId) {
    return await Product.findByPk(productId, {
      include: [
        {
          model: Brand,
          as: 'brandInfo',
          attributes: ['brand_id', 'brand_name', 'brand_image_url']
        },
        {
          model: ProductCategory,
          as: 'categoryInfo',
          attributes: ['product_category_id', 'category_name', 'category_description']
        },
        {
          model: ProductImage,
          as: 'images',
          attributes: ['image_id', 'image_url', 'image_name', 'is_primary', 'sort_order'],
          order: [['sort_order', 'ASC']]
        },
        {
          model: ProductItem,
          as: 'variants',
          include: [
            {
              model: Colour,
              as: 'colour',
              attributes: ['colour_id', 'colour_name', 'colour_code']
            },
            {
              model: SizeOption,
              as: 'size',
              attributes: ['size_id', 'size_name']
            },
            {
              model: ProductVariantImage,
              as: 'variantImages',
              attributes: ['image_id', 'image_url', 'image_name', 'sort_order'],
              order: [['sort_order', 'ASC']]
            }
          ]
        }
      ]
    });
  }
  
  // Get product variant by ID
  async getProductVariantById(productItemId) {
    return await ProductItem.findByPk(productItemId, {
      include: [
        {
          model: Product,
          as: 'product',
          attributes: ['product_id', 'product_name']
        },
        {
          model: Colour,
          as: 'colour',
          attributes: ['colour_id', 'colour_name', 'colour_code']
        },
        {
          model: SizeOption,
          as: 'size',
          attributes: ['size_id', 'size_name']
        },
        {
          model: ProductVariantImage,
          as: 'variantImages',
          attributes: ['image_id', 'image_url', 'image_name', 'sort_order'],
          order: [['sort_order', 'ASC']]
        }
      ]
    });
  }
  
  // Get all products with pagination
  async getAllProducts(page = 1, limit = 10, filters = {}) {
    const offset = (page - 1) * limit;
    const whereClause = this.buildWhereClause(filters);
    
    const { count, rows } = await Product.findAndCountAll({
      where: whereClause,
      include: [
        {
          model: Brand,
          as: 'brandInfo',
          attributes: ['brand_id', 'brand_name']
        },
        {
          model: ProductCategory,
          as: 'categoryInfo',
          attributes: ['product_category_id', 'category_name']
        },
        {
          model: ProductImage,
          as: 'images',
          attributes: ['image_id', 'image_url', 'is_primary'],
          where: { is_primary: true },
          required: false
        }
      ],
      limit,
      offset,
      order: [['created_at', 'DESC']]
    });
    
    return {
      products: rows,
      pagination: {
        total: count,
        page,
        pages: Math.ceil(count / limit),
        limit
      }
    };
  }
  
  // Helper method to map UI data to database fields
  mapProductData(productData) {
    return {
      product_name: productData.productName,
      description: productData.description,
      category: productData.category,
      brand: productData.brand,
      product_type: productData.productType,
      original_price: productData.originalPrice ? parseFloat(productData.originalPrice) : null,
      sale_price: productData.salePrice ? parseFloat(productData.salePrice) : null,
      is_published: productData.isPublished || false,
      sku: productData.sku,
      barcode: productData.barcode,
      stock_status: productData.stockStatus,
      track_inventory: productData.trackInventory || false,
      quantity: productData.quantity ? parseInt(productData.quantity) : 0,
      continue_selling_out_of_stock: productData.continueSellingOutOfStock || false,
      minimum_stock_limit: productData.minimumStockLimit ? parseInt(productData.minimumStockLimit) : null,
      below_limit: productData.belowLimit ? parseInt(productData.belowLimit) : null,
      is_physical_product: productData.isPhysicalProduct !== false,
      weight: productData.weight ? parseFloat(productData.weight) : null,
      length: productData.length ? parseFloat(productData.length) : null,
      breadth: productData.breadth ? parseFloat(productData.breadth) : null,
      height: productData.height ? parseFloat(productData.height) : null,
      brand_id: productData.brand_id || null,
      product_category_id: productData.product_category_id || null
    };
  }
  
  // Helper method to create product images
  async createProductImages(productId, imageFiles, transaction) {
    const imagePromises = imageFiles.map((file, index) => {
      return ProductImage.create({
        product_id: productId,
        image_url: file.path || file.url,
        image_name: file.originalname || file.name,
        is_primary: index === 0, // First image is primary
        sort_order: index
      }, { transaction });
    });
    
    return await Promise.all(imagePromises);
  }
  
  // Helper method to build where clause for filtering
  buildWhereClause(filters) {
    const where = {};
    
    if (filters.search) {
      where[Op.or] = [
        { product_name: { [Op.iLike]: `%${filters.search}%` } },
        { description: { [Op.iLike]: `%${filters.search}%` } }
      ];
    }
    
    if (filters.category) {
      where.product_category_id = filters.category;
    }
    
    if (filters.brand) {
      where.brand_id = filters.brand;
    }
    
    if (filters.status) {
      where.status = filters.status;
    }
    
    if (filters.is_published !== undefined) {
      where.is_published = filters.is_published;
    }
    
    return where;
  }
}

module.exports = new ProductService();
// class ProductService {

//   // Add a new product along with its initial variant
//   static async addProduct(productData, variantData, transaction = null) {
//     try {
      
//       // Create the Product entry first
//       const product = await Product.create({
//         product_name: productData .product_name,
//         product_description: productData .product_description,
//         product_category_id: productData .product_category_id,
//         brand_id: productData .brand_id,
//         status: productData .status || 'available'
//       }, { transaction });

//       console.log("✅ Product created successfully:", product.product_id);

//       // Create the initial variant (ProductItem) using ProductItemService
//       const productItem = await ProductItemService.addProductItem(
//         product.product_id,
//         variantData,
//         transaction
//       );

//       console.log("✅ Initial Product Item created successfully for Product:", product.product_id);
//       return { product, productItem };
      
//     } catch (error) {
//       console.error("❌ Error adding product:", error.message);
//       throw new Error(error.message);
//     }
//   }

//   // Retrieve a product along with all its variants
//   static async getProduct(product_id) {
//     try {
//       const product = await Product.findByPk(product_id, {
//         include: [
//           { model: ProductCategory, attributes: ['product_category_id', 'category_name'] },
//           { model: Brand, attributes: [ 'brand_id', 'brand_name'] },
//         ]
//       });

//       if (!product) throw new Error(`Product not found with ID: ${product_id}`);

//       // Fetching associated variants using ProductItemService
//       const productItems = await ProductItemService.getProductItems(product_id);

//       console.log("✅ Product retrieved successfully with variants.");
//       return { product, productItems };
      
//     } catch (error) {
//       console.error("❌ Error retrieving product:", error.message);
//       throw new Error(error.message);
//     }
//   }
//   // Fetch all products with variants and images
// static async getAllProducts() {
//   try{
//     const products = await Product.findAll({
//     include: [
//       { model: ProductCategory, attributes: ["category_name"] },
//       { model: Brand, attributes: ["brand_name"] },
//       {
//         model: ProductItem,
//         //required: true, // Ensures only products with at least one variant are fetched
//         attributes: ["product_item_id", "original_price", "discount_applicable","sale_price", "qty_in_stocks"],
//         include: [
//           { model: Colour, attributes: ["colour_id", "colour_name"] },
//           { model: SizeOption, attributes: ["size_id","size_name"] },
//           { model: ProductImage, attributes: ["image_id", "image_url"], }, 
//         ],
//         // Order by stock quantity (highest first)
//         //limit: 1, // Fetch only the highest-stock ProductItem for each product
//       },
//     ],
//     order: [[ProductItem, "qty_in_stocks", "DESC"]],
//   });

//   console.log("✅ Products retrieved successfully.");
//   return products;
// } catch (error) {
//   console.error("❌ Error fetching products:", error.message);
//   throw new Error(error.message);
// }
// }


//   // Update a product
//   static async updateProduct(product_id, updatedData, transaction = null) {
//     try {
//       const product = await Product.findByPk(product_id);

//       if (!product) throw new Error(`Product not found with ID: ${product_id}`);

//       await product.update({
//         product_name: updatedData.product_name,
//         product_description: updatedData.product_description,
//         product_category_id: updatedData.product_category_id,
//         brand_id: updatedData.brand_id,
//         status: updatedData.status
//       }, { transaction });

//       console.log("✅ Product updated successfully");
//       return product;

//     } catch (error) {
//       console.error("❌ Error updating product:", error.message);
//       throw new Error(error.message);
//     }
//   }
//   // Fetch distinct product statuses
// static async getProductStatuses() {
//   try {
//     const statuses = await Product.findAll({
//       attributes: [
//         [sequelize.fn("DISTINCT", sequelize.col("status")), "status"],
//       ],
//       raw: true, // Ensures only the status values are returned
//     });

//     return statuses.map((s) => s.status); // Extracting only status values
//   } catch (error) {
//     throw new Error("Failed to fetch product statuses");
//   }
// }

//   // Delete or restore a product
//   static async deleteRestoreProduct(product_id, restore = false, transaction = null) {
//     try {
//       const product = await Product.findByPk(product_id, { paranoid: false });

//       if (!product) throw new Error(`Product not found with ID: ${product_id}`);

//       if (restore) {
//         await product.restore({ transaction });
//         console.log("✅ Product restored successfully");
//       } else {
//         await product.destroy({ transaction });
//         console.log("✅ Product deleted successfully");
//       }

//       return { message: restore ? "Product restored" : "Product deleted" };
      
//     } catch (error) {
//       console.error("❌ Error deleting/restoring product:", error.message);
//       throw new Error(error.message);
//     }
//   }

//   static async getProductsByCategory(category_name) {
//     try {
//       const products = await Product.findAll({
//         include: [
//           {
//             model: ProductCategory,
//             where: { category_name },
//             attributes: ["category_name"]
//           },
//           { model: Brand, attributes: ["brand_name"] },
//           {
//             model: ProductItem,
//             attributes: ["product_item_id", "original_price", "discount_applicable", "sale_price", "qty_in_stocks"],
//             include: [
//               { model: Colour, attributes: ["colour_id", "colour_name"] },
//               { model: SizeOption, attributes: ["size_id", "size_name"] },
//               { model: ProductImage, attributes: ["image_id", "image_url"] }
//             ]
//           }
//         ],
//         order: [[ProductItem, "qty_in_stocks", "DESC"]]
//       });
  
//       return products;
//     } catch (error) {
//       console.error("❌ Error in getProductsByCategory:", error.message);
//       throw new Error("Failed to fetch products by category.");
//     }
//   }
  
// }

// module.exports = ProductService;
