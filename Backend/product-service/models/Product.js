const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");
const ProductCategory = require("./ProductCategory");
const Brand = require("./Brand");
const Product = sequelize.define(
  "Product", {
  product_id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  product_name: {
    type: DataTypes.STRING(500),
    allowNull: false
  },
  description: {
    type: DataTypes.STRING(2000),
    allowNull: true
  },
  product_type: {
    type: DataTypes.STRING(20),
    defaultValue: 'Goods'
  },
  original_price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: true
  },
  sale_price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: true
  },
  is_published: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  sku: {
    type: DataTypes.STRING(100),
    unique: true,
    allowNull: true
  },
  barcode: {
    type: DataTypes.STRING(100),
    unique: true,
    allowNull: true
  },
  stock_status: {
    type: DataTypes.STRING(100),
    allowNull: true
  },
  track_inventory: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  quantity: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  continue_selling_out_of_stock: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  minimum_stock_limit: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  below_limit: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  is_physical_product: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  },
  weight: {
    type: DataTypes.DECIMAL(8, 3),
    allowNull: true
  },
  length: {
    type: DataTypes.DECIMAL(8, 2),
    allowNull: true
  },
  breadth: {
    type: DataTypes.DECIMAL(8, 2),
    allowNull: true
  },
  height: {
    type: DataTypes.DECIMAL(8, 2),
    allowNull: true
  },
  status: {
    type: DataTypes.STRING(50),
    defaultValue: 'active'
  },
  brand_id: {
    type: DataTypes.UUID,
    allowNull: true,
    references: {
      model: Brand,
      key: 'brand_id'
    }
  },
  product_category_id: {
    type: DataTypes.UUID,
    allowNull: true,
    references: {
      model: ProductCategory,
      key: 'product_category_id'
    }
  }
}, {
  tableName: 'product',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  deletedAt: 'deleted_at',
  paranoid: true
}
);

module.exports = Product;

