import PropTypes from "prop-types";
import "./cartItem.css";

const CartItem = ({ item, removeFromCart, updateCartQuantity }) => {
  const {
    cart_items_id,
    quantity,
    item_total,
    product_info: {
      product_item_id,
      colour,
      size,
      image,
      sale_price,
    },
  } = item;

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
          <h4>{`${colour} / ${size}`}</h4>  
          <p>Price: ${parseFloat(sale_price).toFixed(2)}</p>  
          <div className="quantity-control">
          <button onClick={handleDecrease}>-</button>
          <span>{quantity}</span>
          <button onClick={handleIncrease}>+</button>
        </div>
        <p>Total: ₹{parseFloat(item_total).toFixed(2)}</p>
     
      </div>  
      <button onClick={handleRemove}>Remove</button>
  </div>  
    );
   
  };
  CartItem.propTypes = {
    item: PropTypes.shape({
      cart_items_id: PropTypes.string.isRequired,
      quantity: PropTypes.number.isRequired,
      item_total: PropTypes.string.isRequired,
      product_info: PropTypes.shape({
        product_item_id: PropTypes.string.isRequired,
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
