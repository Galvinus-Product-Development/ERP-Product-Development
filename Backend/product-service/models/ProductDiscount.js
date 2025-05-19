const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");

const ProductDiscount = sequelize.define("ProductDiscount", {
    product_discount_id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    product_item_id: DataTypes.UUID,
    discount_id: DataTypes.UUID,
  }, {
    tableName: 'product_discount',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: false,
  });

module.exports = ProductDiscount;