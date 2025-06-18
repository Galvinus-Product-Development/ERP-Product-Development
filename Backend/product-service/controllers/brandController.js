const brandService = require('../services/brandService');
//const { Brand } = require('../models');

// GET all brands
exports.getAllBrands = async (req, res) => {
  try {
    const brands = await brandService.getAllBrands();
    res.status(200).json(brands);
  } catch (error) {
    console.error("Error fetching brands:", error);
    res.status(500).json({ error: "Failed to fetch brands" });
  }
};

// GET brand by ID
exports.getBrandById = async (req, res) => {
  try {
    const brand = await brandService.getBrandById(req.params.id);
    if (!brand) return res.status(404).json({ error: "Brand not found" });
    res.status(200).json(brand);
  } catch (error) {
    console.error("Error fetching brand:", error);
    res.status(500).json({ error: "Failed to fetch brand" });
  }
};

// CREATE a new brand
exports.createBrand = async (req, res) => {
  try {
    console.log("BODY:", req.body);   
    console.log("FILE:", req.file);   
    const { brand_name, brand_description } = req.body;
    const brand_image_url = req.file ? req.file.location : null; // Get S3 URL
    const newBrand = await brandService.createBrand({
      brand_name,
      brand_description,
      brand_image_url,
  });
    res.status(201).json(newBrand);
  } catch (error) {
    console.error("Error creating brand:", error);
    res.status(500).json({ error: "Failed to create brand" });
  }
};

// UPDATE an existing brand
exports.updateBrand = async (req, res) => {
  try {
    const { brand_name, brand_description } = req.body;
    const brand_image_url = req.file ? req.file.location : null; // Get S3 URL
    const updatedBrand = await brandService.updateBrand(req.params.id, {
      brand_name,
      brand_description,
      brand_image_url,
    });
    res.status(200).json({ message: "Brand updated successfully", brand: updatedBrand });
  } catch (error) {
    console.error("Error updating brand:", error);
    res.status(500).json({ error: "Failed to update brand" });
  }
};

// DELETE a brand
exports.deleteBrand = async (req, res) => {
  try {
    //const brand = await Brand.findByPk(req.params.id);
    //if (!brand) return res.status(404).json({ error: "Brand not found" });
    const deletedBrand =await brandService.deleteBrand(req.params.id);
    res.status(200).json({ message: "Brand deleted successfully", deletedAt: deletedBrand.deletedAt });
  } catch (error) {
    console.error("Error deleting brand:", error);
    res.status(500).json({ error: "Failed to delete brand" });
  }
};

exports.restoreBrand = async (req, res) => {
  try {
    const restoredBrand = await brandService.restoreBrand( req.params.id );

   // if (!brand) return res.status(404).json({ error: "Brand not found" });

    //await brand.restore(); // Restore the soft-deleted record
    res.status(200).json({ message: "Brand restored successfully", brand:restoredBrand, restoredAt: restoredBrand.restoredAt });
  } catch (error) {
    console.error("Error restoring brand:", error);
    res.status(500).json({ error: "Failed to restore brand" });
  }
};
