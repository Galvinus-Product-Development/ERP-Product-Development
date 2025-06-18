const ProductImageService = require("../services/productImageService");

class ProductImageController {

  // Upload images for a specific product variant
  static async uploadProductImages(req, res) {
    const { product_item_id } = req.params;
    //const imageUrls = req.body.imageUrls; // Array of image URLs
 
    try {
      if (!req.files || req.files.length === 0) {
        return res.status(400).json({ message: "No images provided" });
      }

      const imageUrls = req.files.map(file => file.location);
      await ProductImageService.uploadProductImages(product_item_id, imageUrls);
      res.status(201).json({ message: "Images uploaded successfully" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  // Fetch all images for a given product variant
  static async getProductImages(req, res) {
    const { product_item_id } = req.params;

    try {
      const images = await ProductImageService.getProductImages(product_item_id);
      res.status(200).json({ data: images });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  // Delete a product image
  static async deleteProductImage(req, res) {
    const { image_id } = req.params;

    try {
      await ProductImageService.deleteProductImage(image_id);
      res.status(200).json({ message: "Image deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}

module.exports = ProductImageController;

/*exports.addImage = async (req, res) => {
  try {
    if (!req.body.product_item_id || !req.file) {
      return res.status(400).json({ error: "Product Item ID and image file are required!" });
    }

    const { product_item_id } = req.body;
    const image_url = req.file.location; // Get S3 image URL

    const image = await productImageService.addProductImage(product_item_id, image_url);
    res.status(201).json({ message: "Images added successfully", image });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getImages = async (req, res) => {
  try {
    const { product_item_id } = req.params;
    const images = await productImageService.getImagesByProductItem(product_item_id);
    res.status(200).json(images);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateImages = async (req, res) => {
  try {
    const { image_id } = req.params;
    if (!req.file) {
      return res.status(400).json({ error: "New image file is required!" });
    }

    const image_url = req.file.location;
    await productImageService.updateProductImage(image_id, image_url);
    res.status(200).json({ message: "Images updated successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteImage = async (req, res) => {
  try {
    const { image_id } = req.params;
    await productImageService.deleteProductImage(image_id);
    res.status(200).json({ message: "Image deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
*/