import PropTypes from "prop-types";
import React from "react";
import "./OrderSummary.css";

const OrderSummary = ({ orderId, orderDate, total, paymentMethod })=>{


return(
<div className="order-summary">
    <div>
        <span>Order ID:</span> <strong>{orderId}</strong>
        
    </div>
    <div>
        <span>Order Date:</span> <strong>{orderDate}</strong>
    </div>
    <div>
        <span>Total:</span> <strong>${total.toFixed(2)}</strong>
    </div>
    <div>
        <span>Payment method:</span> <strong>{paymentMethod}</strong>
    </div>
</div>
)};

OrderSummary.propTypes = {
    orderId: PropTypes.string.isRequired,
    orderDate: PropTypes.string.isRequired,
    total: PropTypes.number.isRequired,
    paymentMethod: PropTypes.string.isRequired,
  };


export default OrderSummary;