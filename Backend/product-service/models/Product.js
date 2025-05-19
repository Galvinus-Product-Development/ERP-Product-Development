const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");
const ProductCategory = require("./ProductCategory");
const Brand = require("./Brand");
const Product = sequelize.define(
  "Product",
  {
    product_id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      
    },
    product_name: {
      type: DataTypes.STRING(500),
      allowNull: false,
    },
    product_category_id: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: ProductCategory,
        key: "product_category_id",
      },
    },
    product_description: {
      type: DataTypes.STRING(1000),
      allowNull: true,
      defaultValue: null,
    },
    brand_id: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: Brand,
        key: "brand_id",
      },
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "available",
      validate: {
        isIn: {
          args: [["available", "out of stock", "discontinued"]],
          msg: "Status must be 'available', 'out of stock', or 'discontinued'",
        },
      },
    },
    deletedAt:{
      type: DataTypes.DATE,
      allowNull: true,
    },
    restoredAt: {  
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    tableName: "product",
    timestamps: true,
    paranoid: true,
  }
);

module.exports = Product;

