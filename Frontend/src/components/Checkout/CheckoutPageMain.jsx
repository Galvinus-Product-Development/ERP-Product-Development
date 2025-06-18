import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import DeliveryAddressSection from "../Cart/DeliveryAddressSection"; // Move your address logic into a reusable component
import { useCart } from "../Context/CartContext";
import './CheckoutPageMain.css';
import RazorpayCheckoutButton from "./RazorpayCheckoutButton";
import YourOrder from "./YourOrder"; // Reuse your existing summary component

const CheckoutPageMain = () => {

  const { user_id } = useParams(); 
  console.log("🚀 user_id from route:", user_id);
  const { cart } = useCart();
  const cartItems = cart?.CartItems || [];
  
  
  const [address, setAddress] = useState(null);
  const [showPayment, setShowPayment] = useState(false);
  const [orderData, setOrderData] = useState(null);

  const handleAddressSubmit = (newAddress) => {
    console.log("handleAddressSubmit called with:", newAddress);
    setAddress(newAddress);
    localStorage.setItem("shippingAddress", JSON.stringify(newAddress));
    setShowPayment(true);
    console.log("✅ Payment section should now be visible.");
  };
  
  useEffect(() => {
    console.log("🔥 showPayment changed:", showPayment);
  }, [showPayment]);
  
  useEffect(() => {
    if (orderData) {
      console.log("🧾 Order placed successfully:", orderData);
    }
  }, [orderData]);

  return (
    <div className="checkout-main-container">
    <h2 className="checkout-heading">Checkout</h2>

    {/* Section 1: Delivery Address */}
    <div className="checkout-section">
      
      <DeliveryAddressSection 
          onAddressSubmit={handleAddressSubmit}
      />
    </div>

    {/* Section 2: Cart Summary */}
    <div className="checkout-section">
      
      <YourOrder cartItems={cartItems} />
    </div>

    {/* Section 3: Continue Button */}
    {showPayment && address && (
        <div className="payment-section">
         
          <RazorpayCheckoutButton  
            user_id={user_id}
            address={address}
            setOrderData={setOrderData}
          />
        </div>
      )}
    </div>
  );
};


export default CheckoutPageMain;
