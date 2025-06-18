const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");

const HomepageSection = sequelize.define('HomepageSection', {
    section_id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    section_name: {
      type: DataTypes.STRING(100),
      unique: true,
      allowNull: false,
    },
    section_display_name: {
      type: DataTypes.STRING(100),
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    updated_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  }, {
    tableName: 'homepage_section',
    timestamps: false,
}
);

module.exports = HomepageSection;