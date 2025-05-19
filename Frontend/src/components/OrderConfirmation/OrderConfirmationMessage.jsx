import React from "react";
import "./OrderConfirmationMessage.css";

const OrderConfirmationMessage = () => {
  return (
    <div className="confirmation-message">
        <div className="tick-icon">✅</div>
        <h1>Your Order is Confirmed!</h1>
        <p>Thank you for shopping with us. Your order details are below.</p>
    </div>
     
    
  );
};


export default OrderConfirmationMessage;
