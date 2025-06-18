const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");
const ProductCategory = require("./ProductCategory");

const SizeOption = sequelize.define(
  "SizeOption",
  {
    size_id: {
      type: DataTypes.UUID,
  defaultValue: DataTypes.UUIDV4,
  primaryKey: true,

    },
    size_name: {
      type: DataTypes.STRING(100),
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [1, 100]
      }
      //defaultValue: null,
    },
    sort_order: {
      type: DataTypes.INTEGER,
      allowNull: true,
      validate: {
        isInt: true
      }
    },
    product_category_id: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: ProductCategory, 
        key: 'product_category_id'
      }
    }
  },
  {
    tableName: "size_option",
    timestamps: false,
  }
);


module.exports = SizeOption;
