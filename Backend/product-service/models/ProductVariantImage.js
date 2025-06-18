const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");
const ProductItem = require("./ProductItem");

const ProductVariantImage = sequelize.define('ProductVariantImage', {
    image_id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    product_item_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: ProductItem,
        key: 'product_item_id'
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
    sort_order: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    }
  }, {
    tableName: 'product_variant_image',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: false
});
  
module.exports = ProductVariantImage;