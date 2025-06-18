const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");
const CouponReward = require("./CouponReward");
const ProductCategory =require("./ProductCategory")


const CouponRewardCategory = sequelize.define('CouponRewardCategory', {
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
    product_category_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: ProductCategory,
        key: 'product_category_id'
      }
    },
    is_reward_category: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  }, {
    tableName: 'coupon_reward_category',
    timestamps: false,
    indexes: [
      {
        unique: true,
        fields: ['reward_id', 'product_category_id'],
        name: 'unique_reward_category'
      }
    ]
  });

module.exports = CouponRewardCategory;