const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");
const ProductItem = require("./ProductItem");

const ProductImage = sequelize.define(
  "ProductImage",
  {
    image_id: {
      type: DataTypes.UUID,
  defaultValue: DataTypes.UUIDV4,
  primaryKey: true,

    },
    product_item_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: ProductItem,
        key: "product_item_id",
      },
    },
    image_url: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    tableName: "product_image",
    timestamps: false,
  }
);

module.exports = ProductImage;
