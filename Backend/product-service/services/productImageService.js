// services/productImageService.js

const db = require("../models");
const { ProductImage, ProductItem } = db;
const { S3Client, DeleteObjectCommand } = require("@aws-sdk/client-s3");
require("dotenv").config();

// Initialize S3 Client
const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

class ProductImageService {
  
  // Upload images for a specific product variant
  static async uploadProductImages(product_item_id, image_urls, transaction = null) {
    try {
      const productItem = await ProductItem.findByPk(product_item_id);
      if (!productItem) throw new Error(`Product item not found with ID: ${product_item_id}`);

      console.log("✅ Product Item Found:", productItem.product_item_id);
      console.log("🔹 Received images:", image_urls);

      const currentImages = await ProductImage.count({ where: { product_item_id } });
      if (currentImages + image_urls.length > 5) {
        throw new Error("Cannot upload more than 5 images per product variant.");
      }

      const imageData = image_urls.map(url => ({ product_item_id, image_url: url }));
      await ProductImage.bulkCreate(imageData, { transaction });
      
      console.log("✅ Images uploaded successfully");
    } catch (error) {
      console.error("❌ Error uploading images:", error.message);
      throw new Error(`Error uploading images: ${error.message}`);
    }
  }

  // Fetch all images for a given product variant
  static async getProductImages(product_item_id) {
    return await ProductImage.findAll({
      where: { product_item_id },
      attributes: ["image_id", "image_url"],
    });
  }

  // Delete an image from AWS & Database
  static async deleteProductImage(image_id, transaction = null) {
    try {
      const image = await ProductImage.findByPk(image_id);
      if (!image) throw new Error("Image not found");

      const s3Key = image.image_url.split(".com/")[1];

      await s3.send(new DeleteObjectCommand({
        Bucket: process.env.AWS_PRODUCT_BUCKET_NAME,
        Key: s3Key,
      }));

      await image.destroy({ transaction });
      
      console.log("✅ Image deleted successfully");
    } catch (error) {
      console.error("❌ Error deleting image:", error.message);
      throw new Error(error.message);
    }
  }
}

module.exports = ProductImageService;

/*const {ProductImage} = require("../models");

const addProductImage = async (product_item_id, image_urls) => {
  return await ProductImage.create({ product_item_id, image_url: image_urls });
};

const getImagesByProductItem = async (product_item_id) => {
  return await ProductImage.findAll({ where: { product_item_id } });
};

const updateProductImages = async (product_item_id, image_urls) => {
  return await ProductImage.update(
    { image_url: image_url },
    { where: { product_item_id } }
  );
};

const deleteProductImage = async (image_id) => {
  return await ProductImage.destroy({ where: { image_id } });
};

module.exports = { addProductImage, getImagesByProductItem, updateProductImages, deleteProductImage };
*/