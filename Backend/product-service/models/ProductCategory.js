const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");

const ProductCategory = sequelize.define(
  "ProductCategory",
  {
    product_category_id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    category_name: {
      type: DataTypes.STRING(100),
      allowNull: true,
      defaultValue: null,
    },
    category_image: {
      // Assuming an array of image URLs
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: true,
      defaultValue: null,
    },
    category_description: {
      type: DataTypes.STRING(2000),
      allowNull: true,
      defaultValue: null,
    },
    size_category_id: {
      type: DataTypes.UUID,
      allowNull: true,
    },
    parent_category_id: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: "ProductCategory",
        key: "product_category_id",
      },
    },
    status: {
      type: DataTypes.STRING,
      defaultValue: "active",
    },
  },
  {
    tableName: "product_category",
    timestamps: false,
  
  }
);



module.exports = ProductCategory;
