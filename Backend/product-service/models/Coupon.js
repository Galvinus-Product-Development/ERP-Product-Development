const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");


const Coupon = sequelize.define("Coupon", {
    coupon_id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    code: {
      type: DataTypes.STRING,
      unique: true,
    },
    description: DataTypes.STRING,
    discount_type: {
      type: DataTypes.STRING,
      validate: {
        isIn: [['percentage', 'flat']],
      },
    },
    discount_value: DataTypes.DECIMAL(10, 2),
    min_order_value: {
      type: DataTypes.DECIMAL(10, 2),
      defaultValue: 0,
    },
    max_discount_value: DataTypes.DECIMAL(10, 2),
    usage_limit: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
    },
    total_uses_allowed: DataTypes.INTEGER,
    start_date: DataTypes.DATE,
    end_date: DataTypes.DATE,
    is_active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  }, {
    tableName: 'coupon',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  });

module.exports = Coupon;