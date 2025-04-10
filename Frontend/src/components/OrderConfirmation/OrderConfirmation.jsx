import React, { useEffect, useState } from "react";
import AddressSection from "./AddressSection";
import "./OrderConfirmation.css";
import OrderConfirmationMessage from "./OrderConfirmationMessage";
import OrderDetails from "./OrderDetails";
import OrderSummary from "./OrderSummary";

const OrderConfirmation = () => {
    const [orderData, setOrderData] = useState({
        orderId: "",
        orderDate: "",
        total: 0,
        products: [],
        paymentMethod: "",
        shippingAddress: "",
      });
    
      useEffect(() => {
        // Replace with actual API call
        const fetchOrderData = async () => {
          const orderDetails ={
      orderId: "67261",
      orderDate: "January 17, 2025",
      total: 1352.0,
      paymentMethod: "Direct bank transfer",
      products: [
        { id: 1, img:"https://woodmart.xtemos.com/wp-content/uploads/2016/08/product-accessories-8-1-430x491.jpg.webp", name: "Product A", price: 300, quantity: 2 },
        { id: 2, img: "https://woodmart.xtemos.com/wp-content/uploads/2016/09/product-furniture-18.jpg", name: "Product B", price: 752, quantity: 1 },
      ],
      shippingAddress: "123 Street, City, State, Zip",
    };
    setOrderData(orderDetails);
  };
  fetchOrderData();
  }, []);

  return (
    <div className="order-confirmation">
      {/* Confirmation Message */}
      <OrderConfirmationMessage />
      <OrderSummary
        orderId={orderData.orderId}
        orderDate={orderData.orderDate}
        total={orderData.total}
        paymentMethod={orderData.paymentMethod}
      />

      {/* Order Details */}
      <OrderDetails products={orderData.products} total={orderData.total} paymentMethod={orderData.paymentMethod} />

      {/* Address Section */}
      <AddressSection  shippingAddress={orderData.shippingAddress} />
    </div>
  );
};

export default OrderConfirmation;
