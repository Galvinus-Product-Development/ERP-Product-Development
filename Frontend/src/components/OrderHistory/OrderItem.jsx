import PropTypes from "prop-types";
import React, { useState } from "react";
import OrderDetailsModal from "./OrderDetailsModal";
import "./OrderItem.css";

const OrderItem = ({ order }) => {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <div className="order-item">
      <h2>Order ID: {order.id}</h2>
      <img 
        src={order.img} 
        alt={`Product image for order ${order.id}`} 
        className="order-item-image"
      />
      <p>Date: {order.date}</p>
      <p>Total: ${order.total}</p>
      <p>Status: {order.status}</p>
      <button onClick={() => setShowDetails(true)}>View Details</button>

      {showDetails && (
        <OrderDetailsModal order={order} onClose={() => setShowDetails(false)} />
      )}
    </div>
  );
};

OrderItem.propTypes = {
    order: PropTypes.shape({
      id: PropTypes.number.isRequired,
      img: PropTypes.string.isRequired,
      date: PropTypes.string.isRequired,
      total: PropTypes.number.isRequired,
      status: PropTypes.string.isRequired,
    }),
  };

export default OrderItem;