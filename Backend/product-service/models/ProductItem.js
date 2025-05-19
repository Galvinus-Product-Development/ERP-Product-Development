const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");
const Product = require("./Product");
const Colour = require("./Colour");
const SizeOption = require("./SizeOption");

const ProductItem = sequelize.define(
  "ProductItem",
  {
    product_item_id:{
    type: DataTypes.UUID,
  defaultValue: DataTypes.UUIDV4,
  primaryKey: true,

    },
    product_id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: true,
      references: {
        model: Product,
        key: "product_id",
      },
    },
    colour_id: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: Colour,
        key: "colour_id",
      },
    },
    size_id: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: SizeOption,
        key: "size_id",
      },
    },
    original_price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true,
      validate: {
        isDecimal: true,
        min: 0,
      },
    },
    discount_applicable: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true,
      validate: {
        isDecimal: true,
        min: 0,
        max: 100, 
      },
    },

    sale_price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true,
      validate: {
        isDecimal: true,
        min: 0,
      },
    },
    qty_in_stocks: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    
    deletedAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    tableName: "product_item",
    timestamps: true,
    paranoid: true, 
  }
);

module.exports = ProductItem;
