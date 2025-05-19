const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");

    const CouponCategory = sequelize.define('CouponCategory', {
      coupon_category_id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
      },
      coupon_id: {
        type: DataTypes.UUID,
        allowNull: false
      },
      product_category_id: {
        type: DataTypes.UUID,
        allowNull: false
      },
      created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
      }
    }, {
      tableName: 'coupon_category',
      timestamps: false
    });
  
    CouponCategory.associate = (models) => {
      CouponCategory.belongsTo(models.Coupon, {
        foreignKey: 'coupon_id',
        onDelete: 'CASCADE'
      });
  
      CouponCategory.belongsTo(models.ProductCategory, {
        foreignKey: 'product_category_id',
        onDelete: 'CASCADE'
      });
    };
  
    module.exports = CouponCategory;
  
  