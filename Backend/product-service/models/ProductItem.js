const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");
const Product = require("./Product");
const Colour = require("./Colour");
const SizeOption = require("./SizeOption");

const ProductItem = sequelize.define(
  "ProductItem",
  {
    product_item_id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    product_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: Product,
        key: 'product_id'
      }
    },
    colour_id: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: Colour,
        key: 'colour_id'
      }
    },
    size_id: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: SizeOption,
        key: 'size_id'
      }
    },
    original_price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    discount_applicable: {
      type: DataTypes.DECIMAL(5, 2),
      defaultValue: 0
    },
    sale_price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    qty_in_stocks: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    variant_sku: {
      type: DataTypes.STRING(100),
      unique: true,
      allowNull: true
    },
    variant_barcode: {
      type: DataTypes.STRING(100),
      unique: true,
      allowNull: true
    },
    weight: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true
    },
    length: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true
    },
    breadth: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true
    },
    height: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true
    }
  }, {
    tableName: 'product_item',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: 'deleted_at',
    paranoid: true
  }
);

module.exports = ProductItem;
