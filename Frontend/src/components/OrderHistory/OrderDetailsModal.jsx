//import React from "react";
import PropTypes from 'prop-types';
import { useNavigate } from "react-router-dom";
import "./OrderDetailsModal.css";

const OrderDetailsModal = ({ order, onClose }) => {
  const navigate = useNavigate();

  const handleTrack = () => {
    navigate("/track");
   // navigate(`/orders/${order.order_id}/items/${order.order_item_id}/track`);
  };

  const handleCancel = () => {
    navigate("/cancel");
   // navigate(`/orders/${order.order_id}/items/${order.order_item_id}/cancel`);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <img src={order.image_url} alt="Product" className="modal-image" />
        <p><strong>Order ID:</strong> {order.order_id}</p>
        <p><strong>Item ID:</strong> {order.order_item_id}</p>
        <p>{order.product_name} (Size-{order.size})</p>
        <p className="price">${order.total_price}</p>
        <div className="modal-actions">
          <button className="track-btn" onClick={handleTrack}>Track</button>
          <button className="cancel-btn" onClick={handleCancel}>Cancel</button>
        </div>
        <button className="close-btn" onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

OrderDetailsModal.propTypes = {
  order: PropTypes.shape({
    order_id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    order_item_id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    image_url: PropTypes.string,
    product_name: PropTypes.string.isRequired,
    size: PropTypes.string,
    total_price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  }).isRequired,
  onClose: PropTypes.func.isRequired,
};

export default OrderDetailsModal;
