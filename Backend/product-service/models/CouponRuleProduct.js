const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");
const CouponRule = require("./CouponRule");
const Product = require("./Product")

const CouponRuleProduct = sequelize.define('CouponRuleProduct', {
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
    product_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: Product,
        key: 'product_id'
      }
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  }, {
    tableName: 'coupon_rule_product',
    timestamps: false,
    indexes: [
      {
        unique: true,
        fields: ['rule_id', 'product_id'],
        name: 'unique_rule_product'
      }
    ]
  });

module.exports = CouponRuleProduct;