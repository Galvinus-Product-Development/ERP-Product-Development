
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './OrderConfirmation.css';

const OrderConfirmation = () => {
  const { order_id } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const user_id = '6f94aefc-36a1-4e7d-8c7f-2a81bbffb002'; 

  useEffect(() => {
    axios.get(`/api/v1/orders/${order_id}`)
      .then(res => setOrder(res.data.data))
      .catch(err => console.error(err));
  }, [order_id]);

  if (!order) return <p>Loading...</p>;
  const items = order.OrderItems || [];

  return (
    <div className="order-confirmation">
       <div className="confirmation-message">
        <h2>✅ Your Order Confirmed</h2>
        <p>Thank you for shopping with us, your order detail below</p>
      </div>
      <table className="product-table">
        <thead>
          <tr><th>Product</th><th>Quantity</th><th>Total</th></tr>
        </thead>
        <tbody>
          {items.map(item => (
            <tr key={item.order_item_id}>
              <td><img src={item.image_url || '/placeholder.jpg'} width="60" alt={item.product_name}/> {item.product_name}</td>
              <td>{item.quantity}</td>
              <td>${item.item_total}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="price-summary">
        <p><b>Total Price:</b> ${order.total_amount}</p>
        <p><b>Payment Method:</b> {order.payment_method}</p>
        <p><b>Shipping Address:</b> {order.shipping_address}</p>
      </div>

      <div className="actions">
      <button className="detail-btn" onClick={() => navigate(`/orders?user_id=${user_id}`)}>View My Orders</button>
      </div>
    </div>
  );
};

export default OrderConfirmation;

/*import React, { useEffect, useState } from "react";
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
      {/* Confirmation Message 
      <OrderConfirmationMessage />
      <OrderSummary
        orderId={orderData.orderId}
        orderDate={orderData.orderDate}
        total={orderData.total}
        paymentMethod={orderData.paymentMethod}
      />

      {/* Order Details 
      <OrderDetails products={orderData.products} total={orderData.total} paymentMethod={orderData.paymentMethod} />

      {/* Address Section
      <AddressSection  shippingAddress={orderData.shippingAddress} />
    </div>
  );
};

export default OrderConfirmation;
*/
