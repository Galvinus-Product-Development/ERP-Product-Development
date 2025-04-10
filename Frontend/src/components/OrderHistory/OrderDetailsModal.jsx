import PropTypes from "prop-types";
import React from "react";
import './OrderDetailsModal.css';

const OrderDetailsModal = ({ order, onClose }) => {
  return (
    <div className="order-details-modal">
      <div className="modal-content">
      
        <h2>Order Details</h2>
        
        <div className="model-img">
      <img 
            src={order.img} 
            alt={`Product image for order ${order.id}`} 
            className="modal-image" 
          />
    </div>
        <p>Order ID: {order.id}</p>
        <p>Date: {order.date}</p>
        <p>Total: ${order.total}</p>
        <p>Status: {order.status}</p>
        <p>Items: {order.items}</p>

       
        <button onClick={onClose}>Close</button>
      </div>

    </div>
  );
};

OrderDetailsModal.propTypes = {
  order: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default OrderDetailsModal;