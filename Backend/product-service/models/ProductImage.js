const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");
const Product = require("./Product");

const ProductImage = sequelize.define(
  "ProductImage",
  {
    image_id: {
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
    image_url: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    image_name: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    is_primary: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    sort_order: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    }
  }, {
    tableName: 'product_image',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: false
  }
);

module.exports = ProductImage;
