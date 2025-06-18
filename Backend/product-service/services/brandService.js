const { Brand } = require('../models');


// Get all brands (excluding soft-deleted ones)
const getAllBrands = async () => {
  return await Brand.findAll();
};

// Get a brand by its ID
const getBrandById = async (id) => {
  return await Brand.findByPk(id);
};

// Create a new brand
const createBrand = async (data) => {
  const { brand_name, brand_description, brand_image_url } = data;
  return await Brand.create({ brand_name, brand_description, brand_image_url });
};

// Update an existing brand
const updateBrand = async (id, data) => {
  const brand = await Brand.findByPk(id);
  if (!brand) {
    throw new Error('Brand not found');
  }
  return await brand.update(data);
};

// Soft delete a brand (using Sequelize’s paranoid feature)
const deleteBrand = async (id) => {
  const brand = await Brand.findByPk(id);
  if (!brand) {
    throw new Error('Brand not found');
  }
  return await brand.destroy();
};

// Restore a soft-deleted brand
const restoreBrand = async (id) => {
  const brand = await Brand.findOne({
    where: { brand_id: id },
    paranoid: false, // include soft-deleted records
  });
  if (!brand) 
    throw new Error('Brand not found');
  
  await brand.restore();
  await brand.update({ restoredAt: new Date() });
  return brand;
};

module.exports = {
  getAllBrands,
  getBrandById,
  createBrand,
  updateBrand,
  deleteBrand,
  restoreBrand,
};
