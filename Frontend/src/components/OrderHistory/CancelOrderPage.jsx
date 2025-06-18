
import React from 'react';

import './CancelOrderPage.css';

const mockCancelData = {
  orderId: 2,
  product: {
    name: "Shirt",
    size: "M",
    price: 500,
    imageUrl: "https://woodmart.xtemos.com/wp-content/uploads/2016/08/product-accessories-8-1-430x491.jpg.webp"
  },
  statusHistory: [
    {
      status: "Order Confirmed",
      date: "11/05/2024"
    },
    {
      status: "Order Cancelled",
      date: "11/05/2024"
    }
  ]
}; 

const CancelOrderPage = () => {
  const { orderId, product, statusHistory } = mockCancelData;

  return (
    <div className="cancel-order-container">
      <div className="product-info-main">
        <img src={product.imageUrl} alt={product.name} />
        <div>
          <p className="product-name">{product.name}</p>
          <p className="product-size">Size: {product.size}</p>
          <p className="product-price">${product.price}</p>
        </div>
      </div>

      <p className="order-id">Order ID: {orderId}</p>

      <div className="cancel-status">
        {statusHistory.map((status, index) => (
            <div className="cancel-status-item" key={index}>
            <div className="cancel-status-marker-container">
                <div
                className={`cancel-status-marker ${
                    status.status === "Order Confirmed"
                    ? "confirmed"
                    : status.status === "Order Cancelled"
                    ? "cancelled"
                    : ""
                }`}
                />
                {index < statusHistory.length - 1 && <div className="cancel-status-line" />}
            </div>
            <div className="cancel-status-content">
                <strong>{status.status}</strong>
                <p>{status.date}</p>
            </div>
            </div>
        ))}
</div>


    </div>
  );
};

export default CancelOrderPage;
