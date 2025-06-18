const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");

const Brand = sequelize.define(
  "Brand",
  {
    brand_id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    brand_name: {
      type: DataTypes.STRING(200),
      allowNull: true,
      defaultValue: null,
    },
    brand_description: {
      type: DataTypes.STRING(2000),
      allowNull: true,
      defaultValue: null,
    },
    brand_image_url: {
      type: DataTypes.TEXT,  
      allowNull: true,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: DataTypes.NOW,
    },
    deletedAt: {
      type: DataTypes.DATE,
      allowNull: true, // Allows soft deletion
    },
    restoredAt: {  
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    tableName: "brand",
    timestamps: true,
    paranoid: true,
  }
);

module.exports = Brand;
