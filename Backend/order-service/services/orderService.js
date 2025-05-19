const axios = require('axios');
const { CART_SERVICE_URL } = require('../config/db');
const db = require("../models");
const sequelize = db.sequelize;
const { Order, OrderItem, OrderAuditLog, OrderNote } = db;  // Combined model index
//const { Sequelize } = require('sequelize');
// Define the allowed status values
const ALLOWED_STATUSES = ['PENDING', 'SHIPPED', 'DELIVERED', 'CANCELLED', 'FAILED', 'REFUNDED'];

// Function to validate status
const isValidStatus = (status) => {
    return ALLOWED_STATUSES.includes(status);
};

  exports.createOrder = async(orderData) =>{
    //const transaction = await Order.sequelize.transaction();
    const transaction = await sequelize.transaction();
    try {
        const { user_id, shipping_address, payment_method  } = orderData;
            // 1. Fetch cart for the user
            const cartResponse = await axios.get(`${CART_SERVICE_URL}/${user_id}`);
            const cart = cartResponse.data;

            if (!cart || cart.CartItems.length === 0) {
                throw new Error('Cart is empty. Cannot create order.');
            }

            console.log("Creating Order with:", {
                user_id,
                shipping_address,
                payment_method,
                status: 'PENDING',
                total_amount: cart.overall_total
              });
              
        // Create order
        const order = await Order.create(
            {   user_id,
                shipping_address,
                payment_method,
                status: 'PENDING',
                total_amount: cart.overall_total
            }, { transaction }
        );

         // 3. Create Order Items
    const orderItems = cart.CartItems.map(item => ({
        //order_item_id: uuidv4(),
        order_id: order.order_id,
        product_item_id: item.product_item_id,
        product_name: item.product_info?.name,
        quantity: item.quantity,
        unit_price: item.unit_price,
        item_total: item.item_total,
        image_url: item.product_info?.image || null,
        product_details: item.product_info || {}


    }));
    console.log("Order ID:", order.order_id);

        console.log("Prepared Items:", orderItems);
        if (!orderItems.length) {
            throw new Error('No order items prepared for bulk insert.');
        }
        console.log("Is order_id in first item?", orderItems[0]?.order_id); 
    await OrderItem.bulkCreate(orderItems, { transaction });

        // Create initial audit log
        await OrderAuditLog.create({
            order_id: order.order_id,
            status: 'PENDING',
            changed_by: orderData.created_by || 'SYSTEM',
             note: 'Order created from cart'
        }, { transaction });

        // Commit before making external call
  await transaction.commit();

       // 5. Clear cart
    await axios.delete(`${CART_SERVICE_URL}/${user_id}`);

    return {
        order,
        order_items: orderItems
    };
}
        catch (err) {
            await transaction.rollback();
            throw err;
        }
};

  exports.getOrderById =async(orderId) =>{
    return await Order.findByPk(orderId, {
        include: [
            { model: OrderItem },
            { model: OrderAuditLog },
            { model: OrderNote }
        ]
    });
}

  exports.updateOrderStatus=async(orderId, newStatus, changedBy = 'SYSTEM')=> {
    const transaction = await Order.sequelize.transaction();
    try {

        if (!isValidStatus(newStatus)) {
            throw new Error('Invalid status');
        }
        const order = await Order.findByPk(orderId, { transaction });
        if (!order) {
            throw new Error('Order not found');
        }

        // Update order status
        order.status = newStatus;
        await order.save({ transaction });

        // Add audit log entry
        await OrderAuditLog.create({
            order_id: orderId,
            status: newStatus,
            changed_by: changedBy
        }, { transaction });

        await transaction.commit();

        return order;
    } catch (error) {
        await transaction.rollback();
        throw error;
    }
}
exports.updateOrderItemStatus = async (order_item_id, newStatus, changedBy = 'SYSTEM') => {
    const transaction = await OrderItem.sequelize.transaction();
    try {
        if (!isValidStatus(newStatus)) {
            throw new Error('Invalid status');
        }

        const orderItem = await OrderItem.findByPk(order_item_id, { transaction });
        if (!orderItem) {
            throw new Error('Order item not found');
        }

        orderItem.status = newStatus;
        await orderItem.save({ transaction });

        await OrderAuditLog.create({
            order_id: orderItem.order_id,
            order_item_id,
            status: newStatus,
            changed_by: changedBy
        }, { transaction });

        await transaction.commit();
        return orderItem;
    } catch (error) {
        await transaction.rollback();
        throw error;
    }
};


  exports.addOrderNote =async(orderId, note, createdBy = 'SYSTEM')=> {
    const order = await Order.findByPk(orderId);
    if (!order) {
        throw new Error('Order not found');
    }

    const orderNote = await OrderNote.create({
        order_id: orderId,
        note,
        created_by: createdBy
    });

    return orderNote;
}

  exports.listOrders =async(query = {})=> {
    const filters = {};

    if (query.user_id) {
        filters.user_id = query.user_id;
    }
    if (query.status) {
        filters.status = query.status;
    }

    return await Order.findAll({
        where: filters,
        include: [
            { model: OrderItem },
            { model: OrderAuditLog },
            { model: OrderNote }
        ],
        order: [['created_at', 'DESC']]
    });
}

exports.evaluateOrderStatus = async (order_id) => {
    const orderItems = await OrderItem.findAll({ where: { order_id } });
    const order = await Order.findByPk(order_id);
    if (!order) throw new Error('Order not found');
  
    const allDelivered = orderItems.every(item => item.status === 'DELIVERED');
    const allShipped = orderItems.every(item => item.status === 'SHIPPED');
    const allFailed = orderItems.every(item => item.status === 'FAILED');
    const allCancelled = orderItems.every(item => item.status === 'CANCELLED');
    const allRefunded = orderItems.every(item => item.status === 'REFUNDED');
    let newStatus = order.status;

    if (allDelivered) {
        newStatus = 'DELIVERED';
    } else if (allShipped) {
        newStatus = 'SHIPPED';
    } else if (allCancelled) {
        newStatus = 'CANCELLED';
    } else if (allFailed) {
        newStatus = 'FAILED';
    } else if (allRefunded) {
        newStatus = 'REFUNDED';
    }

  
     // Validate the new status before updating
     if (!isValidStatus(newStatus)) {
        throw new Error('Invalid status for order');
    }

    // Update order status only if it has changed
    if (newStatus !== order.status) {
        order.status = newStatus;
        await order.save();
  
    await OrderAuditLog.create({
      order_id,
      status: order.status,
      changed_by: 'SYSTEM',
      note: 'Auto-updated from shipping service'
    });
}
  
    return order;
  };
  