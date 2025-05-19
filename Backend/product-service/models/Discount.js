const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");

const Discount = sequelize.define("Discount", {
    discount_id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    discount_name: DataTypes.STRING,
    discount_type: {
      type: DataTypes.STRING,
      validate: {
        isIn: [['percentage', 'flat']],
      },
    },
    discount_value: DataTypes.DECIMAL(10, 2),
    start_date: DataTypes.DATE,
    end_date: DataTypes.DATE,
    is_active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  }, {
    tableName: 'discount',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  });
module.exports = Discount;