
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './OrderConfirmation.css';

const OrderConfirmation = () => {
  const { order_id } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const user_id = '6f94aefc-36a1-4e7d-8c7f-2a81bbffb002'; 

  useEffect(() => {
   /* axios.get(`/api/v1/orders/${order_id}`)
      .then(res => setOrder(res.data.data))
      .catch(err => {
        console.error('Failed to fetch order, using mock data.', err);
  */
        // --- Mock order object ---
        const mockOrder = {
          order_id: "mock-order-1",
          // total_amount: 900,
          discount_price: 30,
          coupon_discount: 100,
          shipping_price: 30,
          payment_method: 'UPI Method',
          shipping_address: '123 Mock Street, Springfield, USA',
          // total_amount: 129.99,
          // payment_method: 'Credit Card',
          // shipping_address: '123 Mock Street, Springfield, USA',
          OrderItems: [
            {
              order_item_id: 'mock-item-1',
              product_name: 'Mock Product 1',
              quantity: 2,
              item_total: 1000,
              image_url: "https://woodmart.xtemos.com/wp-content/uploads/2016/08/product-accessories-8-1-430x491.jpg.webp"
            },
            {
              order_item_id: 'mock-item-2',
              product_name: 'Mock Product 2',
              quantity: 1,
              item_total: 750,
              image_url:  "https://woodmart.xtemos.com/wp-content/uploads/2016/09/product-furniture-18.jpg"
            }
          ]
        };
  
        setOrder(mockOrder);
     
  }, []);
  
  if (!order) return <p>Loading...</p>;
  const items = order.OrderItems || [];
  const itemsSubtotal = order.OrderItems.reduce((sum, item) => sum + item.item_total, 0);
  const totalAmount = itemsSubtotal - order.discount_price - order.coupon_discount + order.shipping_price;

  return (
    <div className="order-confirmation">
       <div className="confirmation-message">
        <h2>✅ Your Order Confirmed</h2>
        <p>Thank you for shopping with us, your order detail below</p>
      </div>
      <div className="product-table-border">
      <table className="product-table">
        <thead>
          <tr>
            <th>Product</th>
            <th>Quantity</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {items.map(item => (
            <tr key={item.order_item_id}>
              <td className="product-cell"><img src={item.image_url || '/placeholder.jpg'} width="60" alt={item.product_name}/> {item.product_name}</td>
              <td>{item.quantity}</td>
              <td>₹{item.item_total}</td>
            </tr>
          ))}
        </tbody>
        </table>
        </div>

      <div className="price-details-box">
      <h4>Price Details ({order.OrderItems.length})</h4>
        <div className="price-line"><span>Total Item Price</span><span>₹{itemsSubtotal}</span></div>
        <div className="price-line"><span>Discount Price</span><span>₹{order.discount_price}</span></div>
        <div className="price-line"><span>Coupon Discount</span><span>₹{order.coupon_discount}</span></div>
        <div className="price-line"><span>Shipping Price</span><span>₹{order.shipping_price}</span></div>
        <div className="price-line"><span>Payment Method</span><span>{order.payment_method}</span></div>
        <div className="price-line total-price"><span>TOTAL PRICE</span><span>₹{totalAmount}</span></div>
      </div>

      {/* Shipping Address */}
      <div className="shipping-address">
        <h4>Shipping Address</h4>
        <p>{order.shipping_address}</p>
      </div>

      {/* Action Button */}
      <div className="actions">
        <button className="detail-btn" onClick={() => navigate(`/orders?user_id=${user_id}`)}>
          View My Orders
        </button>
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
