const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");


const Coupon = sequelize.define('Coupon', {
      coupon_id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
      },
      discount_name: {
        type: DataTypes.STRING(200),
        allowNull: false
      },
      discount_code: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true
      },
      discount_type: {
        type: DataTypes.STRING(50),
        allowNull: false
      },
      currency: {
        type: DataTypes.STRING(3),
        allowNull: false,
        defaultValue: 'USD'
      },
      start_date: {
        type: DataTypes.DATE,
        allowNull: false
      },
      end_date: {
        type: DataTypes.DATE,
        allowNull: false
      },
      usage_limit_type: {
        type: DataTypes.STRING(50)
      },
      usage_limit_value: {
        type: DataTypes.INTEGER
      },
      current_usage_count: {
        type: DataTypes.INTEGER,
        defaultValue: 0
      },
      status: {
        type: DataTypes.STRING(20),
        allowNull: false,
        defaultValue: 'active'
      },
      created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
      },
      updated_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
      },
      deleted_at: {
        type: DataTypes.DATE
      }
    }, {
      tableName: 'coupon',
      paranoid: true,
      deletedAt: 'deleted_at',
      timestamps: true, 
      createdAt: 'created_at', 
      updatedAt: 'updated_at' 
    });
module.exports = Coupon;
  