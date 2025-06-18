const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");
const Coupon = require("./Coupon");

const CouponReward = sequelize.define('CouponReward', {
    reward_id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    coupon_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: Coupon,
        key: 'coupon_id'
      }
    },
    reward_type: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    discount_value_type: {
      type: DataTypes.STRING(20)
    },
    discount_value: {
      type: DataTypes.DECIMAL(10, 2)
    },
    maximum_discount: {
      type: DataTypes.DECIMAL(10, 2)
    },
    free_quantity: {
      type: DataTypes.INTEGER
    },
    free_shipping_enabled: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    shipping_countries: {
      type: DataTypes.ARRAY(DataTypes.TEXT)
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    }
  }, {
    tableName: 'coupon_reward',
    timestamps: false
  });
  module.exports =  CouponReward;
