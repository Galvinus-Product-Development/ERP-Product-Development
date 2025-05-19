
import { useCart } from "../Context/CartContext";
import ApplyCouponSidebar from "./ApplyCouponSidebar";
import CartItem from "./CartItem";
import "./cartPage.css";
import CartSummary from "./CartSummary";
import CouponSection from "./CouponSection";
import DeliveryAddressSection from "./DeliveryAddressSection";
import EmptyCartMessage from "./EmptyCartMessage";

const CartPage = () => {
  const { cart, removeItem, updateItem } = useCart();
  const cartItems = cart?.CartItems || [];
    
  const handleCheckout = () => {  
    // Handle checkout logic here  
    alert("Proceeding to checkout...");  
};  
    

  return (
    <div className="cart-page">
      {cartItems.length === 0 ? (
        <EmptyCartMessage />
      ) : (
        <div className="cart-container">
  <div className="left-section">
    <DeliveryAddressSection />
    <div className="cart-items">
      {cartItems.map((item) => (
        <CartItem
          key={item.cart_items_id}
          item={item}
          removeFromCart={removeItem}
          updateCartQuantity={updateItem}
        />
      ))}
    </div>
  </div>
  <div className="right-sidebar">
    <CouponSection />
    <ApplyCouponSidebar />
    <CartSummary cartItems={cart.CartItems} handleCheckout={handleCheckout} />
    
  </div>
</div>
)}
    </div>
  );
};

export default CartPage;
