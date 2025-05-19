const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");
const Product = require("./Product");
const RatingType = require("./RatingType");

const RatingProduct = sequelize.define(
  "RatingProduct",
  {

    rating_product_id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue:DataTypes.UUIDV4,
    },
    product_id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: true,
      references: {
        model: Product,
        key: "product_id",
      },
    },
    user_id: {
      type: DataTypes.UUID,
      allowNull: true,
    },
    rating_type_id: {
      type: DataTypes.UUID,
      references: {
        model: RatingType,
        key: "rating_type_id",
      },
      allowNull: false,
    },
    rating_value: {
      type: DataTypes.INTEGER,
      allowNull: true,
      validate: {
        min: 1,
        max: 5,
      },
    },
  },
  {
    tableName: "rating_product",
    timestamps: false,
  }
);

module.exports = RatingProduct;
