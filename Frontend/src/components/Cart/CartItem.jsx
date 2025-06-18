import PropTypes from "prop-types";
import { FaRegHeart } from "react-icons/fa";

import "./cartItem.css";

const CartItem = ({ item, removeFromCart, updateCartQuantity }) => {
  const {
    cart_items_id,
    quantity,
    item_total,
    product_info: {
      product_item_id,
      name,
      colour,
      size,
      image,
      sale_price,
    },
  } = item;
  const getEstimatedDeliveryDate = () => {
    const startDate = new Date();
    const endDate = new Date();
  
    // Add 3 to 6 days for estimated delivery
    startDate.setDate(startDate.getDate() + 3);
    endDate.setDate(endDate.getDate() + 6);
  
    const options = { day: 'numeric', month: 'short' }; // e.g., 27 May
    const formattedStart = startDate.toLocaleDateString('en-IN', options);
    const formattedEnd = endDate.toLocaleDateString('en-IN', options);
  
    return `${formattedStart} – ${formattedEnd}`;
  };
  

  const handleDecrease = () => {
    if (quantity > 1) {
      updateCartQuantity(cart_items_id, quantity - 1);
    }
  };

  const handleIncrease = () => {
    updateCartQuantity(cart_items_id, quantity + 1);
  };

  const handleRemove = () => {
    removeFromCart(cart_items_id);
  };
 
    return (
      <div className="cart-item">  
      <img src={image || "/placeholder-image.jpg"}
        alt={`Variant - ${colour} ${size}`}
      />  
        <div className="item-details"> 
        <h3 className="cart-item-name">{item.product_info?.name}</h3>  
          <h4 className="variant-text">{`${colour} / ${size}`}</h4>  
          {/* <p>Price: ${parseFloat(sale_price).toFixed(2)}</p>   */}
          <div className="quantity-control">
          <button onClick={handleDecrease}>-</button>
          <span>{quantity}</span>
          <button onClick={handleIncrease}>+</button>
        </div>
        <span className="item-total">Total: ₹{parseFloat(item_total).toFixed(2)}</span>
     
      </div>  
      <div className="cart-item-actions">
  <p className="estimated-delivery">Delivery by: {getEstimatedDeliveryDate()}</p>
  <div className="action-buttons">
            <button className="wishlist-btn">
              Move to Wishlist <FaRegHeart className="heart-icon" />
            </button>
    <button className="remove-btn" onClick={handleRemove}>Remove</button>
  </div>
</div>

  </div>  
    );
   
  };
  CartItem.propTypes = {
    item: PropTypes.shape({
      cart_items_id: PropTypes.string.isRequired,
      unit_price: PropTypes.string.isRequired,
      quantity: PropTypes.number.isRequired,
      item_total: PropTypes.string.isRequired,
      product_info: PropTypes.shape({
        product_item_id: PropTypes.string.isRequired,
        product_id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        colour: PropTypes.string,
        size: PropTypes.string,
        image: PropTypes.string,
        sale_price: PropTypes.string.isRequired,
      }).isRequired,
    }).isRequired,
    removeFromCart: PropTypes.func.isRequired,
    updateCartQuantity: PropTypes.func.isRequired,
  };
    
export default CartItem;
