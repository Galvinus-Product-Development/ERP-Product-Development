const { SizeOption, ProductCategory } = require('../models');
const { ErrorHandler } = require('../services/errorHandler');

// Get all sizes with category information
exports.getAllSizes = async (req, res, next) => {
  try {
    const sizes = await SizeOption.findAll({
      include: [{
        model: ProductCategory,
        as: 'category',
        attributes: ['product_category_id', 'category_name']
      }],
      order: [['sort_order', 'ASC']]
    });
    res.json(sizes);
  } catch (err) {
    next(new ErrorHandler(500, 'Failed to fetch sizes', err.message));
  }
};

// Get sizes by category
exports.getSizesByCategory = async (req, res, next) => {
  try {
    const { categoryId } = req.params;
    
    const sizes = await SizeOption.findAll({
      where: { product_category_id: categoryId },
      include: [{
        model: ProductCategory,
        as: 'category',
        attributes: ['product_category_id', 'category_name']
      }],
      order: [['sort_order', 'ASC']]
    });
    
    res.json(sizes);
  } catch (err) {
    next(new ErrorHandler(500, 'Failed to fetch sizes by category', err.message));
  }
};

// Create a new size
exports.createSize = async (req, res, next) => {
  try {
    const { size_name, sort_order, product_category_id } = req.body;

    // Validate category exists if provided
    if (product_category_id) {
      const category = await ProductCategory.findByPk(product_category_id);
      if (!category) {
        throw new ErrorHandler(400, 'Invalid product category');
      }
    }

    const size = await SizeOption.create({
      size_name,
      sort_order: sort_order || 1,
      product_category_id
    });

    res.status(201).json(size);
  } catch (err) {
    next(err instanceof ErrorHandler ? err : new ErrorHandler(500, 'Failed to create size', err.message));
  }
};

// Update a size
exports.updateSize = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { size_name, sort_order, product_category_id } = req.body;

    const size = await SizeOption.findByPk(id, {
      include: [{
        model: ProductCategory,
        as: 'category',
        attributes: ['product_category_id', 'category_name']
      }]
    });
    
    if (!size) {
      throw new ErrorHandler(404, 'Size not found');
    }

    // Validate category exists if provided
    if (product_category_id) {
      const category = await ProductCategory.findByPk(product_category_id);
      if (!category) {
        throw new ErrorHandler(400, 'Invalid product category');
      }
    }

    await size.update({
      size_name: size_name || size.size_name,
      sort_order: sort_order || size.sort_order,
      product_category_id: product_category_id || size.product_category_id
    });

    // Reload the size to get fresh associations
    const updatedSize = await size.reload({
      include: [{
        model: ProductCategory,
        as: 'category',
        attributes: ['product_category_id', 'category_name']
      }]
    });

    res.json(updatedSize);
  } catch (err) {
    next(err instanceof ErrorHandler ? err : new ErrorHandler(500, 'Failed to update size', err.message));
  }
};

// Delete a size
exports.deleteSize = async (req, res, next) => {
  try {
    const { id } = req.params;

    const size = await SizeOption.findByPk(id);
    if (!size) {
      throw new ErrorHandler(404, 'Size not found');
    }

    await size.destroy();
    res.status(204).send();
  } catch (err) {
    next(err instanceof ErrorHandler ? err : new ErrorHandler(500, 'Failed to delete size', err.message));
  }
};