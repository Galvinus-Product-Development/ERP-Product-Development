import PropTypes from "prop-types";
import { useState } from "react";
import "../Cart/cartSummary.css";


const YourOrder = ({ cartItems, appliedCoupon, handleCheckout  }) => {
    

  // const [couponDiscount, setCouponDiscount] = useState(10); // assuming ₹10 for now
  const [productDiscount, setProductDiscount] = useState(30); // assuming ₹30 for now
  const [deliveryCharges, setDeliveryCharges] = useState(30); // fixed
  const [platformCharges] = useState(0); // fixed


  const couponDiscount = appliedCoupon?.discount || 0;


    const subtotal = cartItems.reduce((total, item) => {
      const price = parseFloat(item.unit_price);
      return total + price * item.quantity;
    }, 0);
   
    const total= subtotal - productDiscount - couponDiscount + deliveryCharges + platformCharges;;

   
    // const handleCheckout = () => {
    //   // Navigate to the Checkout page
    //   navigate(`/checkout/${user_id}`);
    // };

  return (
    <div className="cart-summary-container">
      {/* Coupons for You */}
      {/* <div className="coupon-section">
        <h3>Coupons for you</h3>
        <div className="apply-coupon">
          <span className="coupon-icon">🏷️</span>
          <span className="coupon-text">Apply Coupons</span>
          <button className="apply-btn">Apply</button>
        </div>
      </div> */}
      
      <h3>Order Totals</h3>
      <div className="summary-row">
      <span>Original Price</span>
      <span>₹{subtotal.toFixed(2)}</span>
      </div>
      <div className="summary-row">
        <span>Discount</span>
        <span>-₹{productDiscount.toFixed(2)}</span>
      </div>
      <div className="summary-row">
        <span>Coupon Discount</span>
        <span>-₹{couponDiscount.toFixed(2)}</span>
      </div>
      <div className="summary-row">
        <span>Delivery Charges</span>
        <span>+₹{deliveryCharges.toFixed(2)}</span>
      </div>
      <div className="summary-row">
        <span>Platform Charges</span>
        <span>+₹{platformCharges.toFixed(2)}</span>
      </div>
      
      <div className="total-row">
        <span>Total: </span>
        <span><strong>₹{total.toFixed(2)}</strong></span>
      </div>
      
    </div>
  );
};

YourOrder.propTypes = { 
  cartItems: PropTypes.arrayOf(
    PropTypes.shape({
      cart_items_id: PropTypes.string.isRequired,
      unit_price: PropTypes.string.isRequired,
      quantity: PropTypes.number.isRequired,
      item_total: PropTypes.string.isRequired,
      product_info: PropTypes.shape({
        product_item_id: PropTypes.string.isRequired,
        product_id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        colour: PropTypes.string.isRequired,
        size: PropTypes.string.isRequired,
        image: PropTypes.string, // can be null
        sale_price: PropTypes.string.isRequired,
      }).isRequired,
    })
  ).isRequired,
  appliedCoupon: PropTypes.shape({
    discount: PropTypes.number.isRequired,
  }),
  handleCheckout: PropTypes.func.isRequired,
};

export default YourOrder;

{/* <h3>Cart Items</h3>

{cartItems.map((item) => (
  <div key={item.cart_items_id} className="cart-item-row">

    <div className="cart-item-details">
      <p className="product-name">{item.product_info?.name}</p>
      <p className="product-meta">
        Color: {item.product_info?.colour} | Size: {item.product_info?.size}
      </p>
      <p className="product-meta">Unit Price: ₹{parseFloat(item.unit_price).toFixed(2)}</p>
      <p className="product-meta">Quantity: {item.quantity}</p>
      <p className="product-meta"><strong>Item Total: ₹{(item.quantity * parseFloat(item.unit_price)).toFixed(2)}</strong></p>
    </div>
  </div>
))}

<hr /> */}