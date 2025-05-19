const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");

    const CategoryDiscount = sequelize.define('CategoryDiscount', {
      category_discount_id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
      },
      product_category_id: {
        type: DataTypes.UUID,
        allowNull: false
      },
      discount_id: {
        type: DataTypes.UUID,
        allowNull: false
      },
      created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
      }
    }, {
      tableName: 'category_discount',
      timestamps: false
    });
  
    CategoryDiscount.associate = (models) => {
      CategoryDiscount.belongsTo(models.ProductCategory, {
        foreignKey: 'product_category_id',
        onDelete: 'CASCADE'
      });
  
      CategoryDiscount.belongsTo(models.Discount, {
        foreignKey: 'discount_id',
        onDelete: 'CASCADE'
      });
    };
  
    module.exports = CategoryDiscount;
  
  