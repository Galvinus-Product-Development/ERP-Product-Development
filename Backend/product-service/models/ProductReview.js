const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");
const Product = require("./Product");

const ProductReview = sequelize.define(
  "ProductReview",
  {
    review_id: {
      type: DataTypes.UUID,
  defaultValue: DataTypes.UUIDV4,
  primaryKey: true,

    },
    product_id: {
      type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      references: {
        model: Product, 
        key: "product_id",
      },
      onDelete: "CASCADE",
    },
    user_id: {
      type: DataTypes.UUID,
      allowNull: true,
    },
    review_title: {
      type: DataTypes.STRING(100),
      allowNull: true,
      defaultValue: "",
    },
    review_comment: {
      type: DataTypes.STRING(500),
      allowNull: true,
      defaultValue: "",
    },
    review_date: {
      type: DataTypes.DATEONLY,
      defaultValue: DataTypes.NOW,
    },
    deletedAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    }
   
    
  },
  {
    tableName: "product_review",
    timestamps: false,
  }
);

module.exports = ProductReview;
