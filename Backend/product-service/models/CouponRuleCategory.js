const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");
const CouponRule = require("./CouponRule");
const ProductCategory = require("./ProductCategory")


const CouponRuleCategory = sequelize.define('CouponRuleCategory', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    rule_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: CouponRule,
        key: 'rule_id'
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
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  }, {
    tableName: 'coupon_rule_category',
    timestamps: false,
    indexes: [
      {
        unique: true,
        fields: ['rule_id', 'product_category_id'],
        name: 'unique_rule_category'
      }
    ]
  });

module.exports = CouponRuleCategory;