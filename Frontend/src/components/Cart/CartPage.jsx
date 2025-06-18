import { useState } from "react";
import { useCart } from "../Context/CartContext";
import CartItem from "./CartItem";
import "./cartPage.css";
import CartSummary from "./CartSummary";
import CouponSection from "./CouponSection";
import DeliveryAddressSection from "./DeliveryAddressSection";
import EmptyCartMessage from "./EmptyCartMessage";

const CartPage = () => {
  const { cart, removeItem, updateItem } = useCart();
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const cartItems = cart?.CartItems || [];
    
  const handleApplyCoupon = (coupon) => {
    setAppliedCoupon(coupon);
  };

  const handleEditCoupon = () => {
    setAppliedCoupon(null);
  };

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
    <DeliveryAddressSection onAddressSubmit={() => {}} />
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
  <CouponSection
         onApplyCoupon={handleApplyCoupon}
         appliedCoupon={appliedCoupon}
         onEditCoupon={handleEditCoupon}     
    />
   
    <CartSummary
         cartItems={cartItems}
         appliedCoupon={appliedCoupon}
         handleCheckout={handleCheckout}
    />
    
  </div>
</div>
)}
    </div>
  );
};

export default CartPage;
