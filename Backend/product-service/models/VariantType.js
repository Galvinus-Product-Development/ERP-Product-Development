const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");

    const VariantType = sequelize.define('VariantType', {
      variant_type_id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      type_name: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true,
        validate: {
          notEmpty: true,
          len: [1, 50]
        }
      },
      display_name: {
        type: DataTypes.STRING(50),
        allowNull: true
      },
      is_required: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
      }
    }, {
      tableName: 'variant_type',
      timestamps: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at',
      underscored: true,
    });
  
    module.exports = VariantType;
