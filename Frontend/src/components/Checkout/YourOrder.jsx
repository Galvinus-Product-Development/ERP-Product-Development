import PropTypes from "prop-types";
import { useState } from "react";
import "../Cart/cartSummary.css";

const YourOrder = ({ cartItems }) => {
    const [shipping, setShipping] = useState(20);
    //const navigate = useNavigate();

    const subtotal = cartItems.reduce((total, item) => {
      const price = parseFloat(item.unit_price);
      return total + price * item.quantity;
    }, 0);
   
    const total= subtotal + shipping;
    // Generate estimated delivery: 5-7 days from now
const estimatedDelivery = new Date();
estimatedDelivery.setDate(estimatedDelivery.getDate() + 5);
const deliveryDate = estimatedDelivery.toDateString();

   
   /* const handleCheckout = () => {
      // Navigate to the Checkout page
      navigate(`/checkout/${user_id}`);
    };*/

  return (
    <div className="cart-summary-container">
      <h3>Your Order</h3>

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

<hr />
      <h3>Order Totals</h3>
      <div className="summary-row">
      <span>Subtotal: </span>
      <span>₹{subtotal.toFixed(2)}</span>
      </div>
      <div className="summary-row">
        <span>Shipping:</span>
        <div className="shipping-options">
          <label>
            <input
              type="radio"
              name="shipping"
              value="20"
              checked={shipping === 20}
              onChange={() => setShipping(20)}
            />
            Flat rate: $20.00
          </label>
          <label>
            <input
              type="radio"
              name="shipping"
              value="25"
              checked={shipping === 25}
              onChange={() => setShipping(25)}
            />
            Local pickup: $25.00
          </label>
        </div>
      </div>
      <div className="summary-row">
      <span>Est. Delivery:</span>
      <span>{deliveryDate}</span>
    </div>
      <div className="total-row">
        <span>Total: </span>
        <span>₹{total.toFixed(2)}</span>
      </div>
   {/*   <div className="checkout">
      <button className="checkout-btn" onClick={handleCheckout}>Proceed to Checkout</button>
    </div>*/}
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
};

export default YourOrder;
