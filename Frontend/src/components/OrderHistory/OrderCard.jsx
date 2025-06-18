import PropTypes from 'prop-types';
import { useNavigate } from "react-router-dom";
import "./OrderCard.css";

// Utility function to calculate expected delivery based on status
const calculateExpectedDelivery = (createdAt, status) => {
  const baseDate = new Date(createdAt);
  const upperStatus = status.toUpperCase();

  let bufferDays = 0;
  if (upperStatus === "PENDING") {
    bufferDays = 8;
  } else if (upperStatus === "SHIPPED") {
    bufferDays = 5;
  }

  if (bufferDays > 0) {
    baseDate.setDate(baseDate.getDate() + bufferDays);
    return baseDate.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }); // e.g., "29 May 2025"
  }

  return null; // No delivery date for Delivered, Cancelled, Refunded
};

const OrderCard = ({ orderItem, orderCreatedAt, paymentMethod }) => {
  const navigate = useNavigate();
  const handleTrack = () => {
    navigate("/track");
    /* navigate(`/track-order/${orderId}/${itemId}`); */
  };
 

    
  const expectedDelivery = calculateExpectedDelivery(orderCreatedAt, orderItem.status);
  return (
    <div className="order-card" key={orderItem.order_item_id}>
      <div className="order-card-left">
        <img
          src={orderItem.product_details.image || "/placeholder.png"}
          alt="Product"
          className="order-image"
        />
        <div className="order-info">
          <p><strong>Order Item ID:</strong> {orderItem.order_item_id}</p>
          <p>{orderItem.product_details.name} (Size-{orderItem.product_details.size})</p>
          {expectedDelivery && (
            <p><strong>Expected Delivery:</strong> {expectedDelivery}</p>
          )}
          <p className={`status ${orderItem.status.toUpperCase()}`}>{orderItem.status}</p>
          <p><strong>Payment:</strong> {paymentMethod}</p>
        </div>
      </div>
      <button className="detail-btn" onClick={() => handleTrack()}>
        Track
      </button>
    </div>
  );
};

OrderCard.propTypes = {
  orderItem: PropTypes.shape({
    order_item_id: PropTypes.string.isRequired,
    order_id: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    product_details: PropTypes.shape({
      name: PropTypes.string.isRequired,
      size: PropTypes.string,
      image: PropTypes.string
    }).isRequired
  }).isRequired,
  orderCreatedAt: PropTypes.string.isRequired,
  paymentMethod: PropTypes.string.isRequired
};
 

export default OrderCard;


// return (
//   <div className="order-card">
//     <div className="order-card-left">
//       <img src={order.image_url|| "/placeholder.png"} alt="Product" className="order-image" />
//       <div className="order-info">
//         <p><strong>Order Item ID:</strong> {order.order_item_id}</p>
//         <p>{order.product_name} (Size-{order.size})</p>
//         {expectedDelivery && (
//           <p><strong>Expected Delivery:</strong> {expectedDelivery}</p>
//         )}
//         <p className="status">{order.status}</p>
//       </div>
//     </div>
//     <button className="details-btn" onClick={handleAction}>
//       {getActionText()}
//     </button>

    
//   </div>
// );
// };

// OrderCard.propTypes = {
// order: PropTypes.shape({
//   image_url: PropTypes.string,
//   order_item_id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
//   product_name: PropTypes.string.isRequired,
//   size: PropTypes.string,
//   order_date: PropTypes.string.isRequired,
//   status: PropTypes.string.isRequired,
// }).isRequired,
// orderCreatedAt: PropTypes.string.isRequired
// };