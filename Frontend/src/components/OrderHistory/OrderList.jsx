import PropTypes from "prop-types";
import React from "react";
import OrderItem from "./OrderItem";
import './OrderList.css';

const OrderList = ({ orders }) => {
  return (
    <div className="order-list">
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        orders.map((order) => <OrderItem key={order.id} order={order} />)
      )}
    </div>
  );
};


OrderList.propTypes = {
  orders: PropTypes.arrayOf(PropTypes.object).isRequired,
};
export default OrderList;