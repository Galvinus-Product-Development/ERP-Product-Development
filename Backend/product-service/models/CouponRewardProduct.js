const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");
const CouponReward = require("./CouponReward");
const Product = require("./Product");


const CouponRewardProduct = sequelize.define('CouponRewardProduct', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    reward_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: CouponReward,
        key: 'reward_id'
      }
    },
    product_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: Product,
        key: 'product_id'
      }
    },
    is_reward_product: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  }, {
    tableName: 'coupon_reward_product',
    timestamps: false,
    indexes: [
      {
        unique: true,
        fields: ['reward_id', 'product_id'],
        name: 'unique_reward_product'
      }
    ]
  });

module.exports = CouponRewardProduct;