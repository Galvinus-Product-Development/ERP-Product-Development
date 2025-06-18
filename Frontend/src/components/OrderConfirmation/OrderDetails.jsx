import PropTypes from "prop-types";
import React from "react";
import "./OrderDetails.css";

const OrderDetails = ({ products, total, paymentMethod }) => {
  const shipping = 20; 

  return (
    <div className="order-details">
      <h3>Order Details</h3>
      <table className="order-details-table">
        <thead>
          <tr>
            <th>Product</th>
            <th>Quantity</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.name} 
              <img 
        src={product.img} 
        alt={`Product image for order ${product.id}`} 
        className="order-item-image"
      />
              </td>
              <td>{product.quantity}</td>
              <td>${(product.price * product.quantity).toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td>Subtotal:</td>
            <td></td>
            <td>${(total - shipping).toFixed(2)}</td>
          </tr>
          <tr>
            <td>Shipping:</td>
            <td></td>
            <td>${shipping.toFixed(2)}</td>
          </tr>
          <tr>
            <td>Payment method:</td>
            <td></td>
            <td>{paymentMethod}</td>
          </tr>
          <tr>
            <td>Total:</td>
            <td></td>
            <td>${total.toFixed(2)}</td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

OrderDetails.propTypes = {
    products: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        quantity: PropTypes.number.isRequired,
      })
    ).isRequired,
    total: PropTypes.number.isRequired,
    paymentMethod: PropTypes.string.isRequired,
  };

export default OrderDetails;
