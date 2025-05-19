const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');
const Order = require('./orderModel');
const { validStatuses } = require('../validators/orderValidator');

const OrderItem = sequelize.define('OrderItem', {
    order_item_id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    order_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: Order,
            key: 'order_id'
        }
    },
    product_item_id: {
        type: DataTypes.UUID,
        allowNull: false
    },
    product_name: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    product_details: {
        type: DataTypes.JSONB, // or DataTypes.JSON
        allowNull: true
      },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            min: 1 // equivalent to CHECK (quantity > 0)
        }
    },
    unit_price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
        item_total: {
          type: DataTypes.DECIMAL(10, 2),
          allowNull: false
        },
        status: {
            type: DataTypes.STRING(50),
            allowNull: false,
            defaultValue: 'PENDING',
            validate: {
              isIn: [validStatuses],
            },
          },
          image_url: {
            type: DataTypes.STRING,
            allowNull: true
          }
          
}, {
    tableName: 'order_items',
    timestamps: false
});

module.exports = OrderItem;
