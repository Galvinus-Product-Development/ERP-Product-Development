const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");
const Coupon = require("./Coupon");

const CouponRule = sequelize.define('CouponRule', {
    rule_id: {
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
    rule_type: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    minimum_order_value: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true,
    },
    minimum_quantity: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  }, {
    tableName: 'coupon_rule',
    timestamps: false,
});
module.exports =CouponRule;