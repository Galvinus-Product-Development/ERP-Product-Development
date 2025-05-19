const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");

const HomepageSectionProduct = sequelize.define('HomepageSectionProduct', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    section_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    product_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    priority: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  }, {
    tableName: 'homepage_section_product',
    timestamps: false,
    indexes: [
      {
        unique: true,
        fields: ['section_id', 'product_id'],
      }
    ],
  });
  module.exports = HomepageSectionProduct;