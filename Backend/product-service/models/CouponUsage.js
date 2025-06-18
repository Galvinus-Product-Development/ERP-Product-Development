const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");
const Coupon = require("./Coupon");

const CouponUsage = sequelize.define('CouponUsage', {
    usage_id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    coupon_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: Coupon,
        key: 'coupon_id'
      }
    },
    user_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    order_id: {
      type: DataTypes.UUID,
      allowNull: true,
    },
    usage_date: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    discount_amount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true,
    },
  }, {
    tableName: 'coupon_usage',
    timestamps: false,
    indexes: [
      {
        fields: ['coupon_id'],
        name: 'idx_coupon_usage_coupon'
      }
    ]
  });

module.exports = CouponUsage;