import PropTypes from 'prop-types';
import { useState } from "react";
import "./OrderCard.css";
import OrderDetailsModal from "./OrderDetailsModal";

const OrderCard = ({ order }) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="order-card">
      <div className="order-card-left">
        <img src={order.image_url|| "/placeholder.png"} alt="Product" className="order-image" />
        <div className="order-info">
          <p><strong>Order Item ID:</strong> {order.order_item_id}</p>
          <p>{order.product_name} (Size-{order.size})</p>
          {order.order_date  && <p>{order.order_date }</p>}
          <p className="status">{order.status}</p>
        </div>
      </div>
      <button className="details-btn" onClick={() => setShowModal(true)}>
        Details
      </button>

      {showModal && <OrderDetailsModal order={order} onClose={() => setShowModal(false)} />}
    </div>
  );
};

OrderCard.propTypes = {
  order: PropTypes.shape({
    image_url: PropTypes.string,
    order_item_id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    product_name: PropTypes.string.isRequired,
    size: PropTypes.string,
    order_date: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
  }).isRequired,
};

export default OrderCard;
