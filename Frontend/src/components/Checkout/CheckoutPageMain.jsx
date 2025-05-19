import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useCart } from "../Context/CartContext";
import AddressPage from "./AddressPage"; // Move your address logic into a reusable component
import './CheckoutPageMain.css';
import RazorpayCheckoutButton from "./RazorpayCheckoutButton";
import YourOrder from "./YourOrder"; // Reuse your existing summary component

const CheckoutPageMain = () => {

  const { user_id } = useParams(); 
  console.log("🚀 user_id from route:", user_id);
  const { cart } = useCart();
  const cartItems = cart?.CartItems || [];
  const savedAddress = localStorage.getItem("shippingAddress");
  const mockAddress = savedAddress
    ? JSON.parse(savedAddress)
    : {
        fullName: "Test User",
        phone: "9999999999",
        pincode: "110001",
        state: "Delhi",
        city: "New Delhi",
        street: "123 Fake Street, Near Metro Station",
      };

  
  const [address, setAddress] = useState(mockAddress);
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
    <div className="checkout-container">
      
      {!showPayment ? (
  <>
    {console.log("🛠 Showing Address Form")}
    <div className="address-section">
      <AddressPage onSubmit={handleAddressSubmit}  defaultAddress={mockAddress} />
    </div>
  </>
) : (
  <>
    {console.log("💳 Showing Payment Section")}
    <div className="payment-section">
      <h2 className="payment-heading">Ready to Pay: CLICK HERE TO REACH THE PAYMENT GATEWAY</h2>
      <RazorpayCheckoutButton  
      user_id={user_id}
      address={address} 
      setOrderData={setOrderData}  />
    </div>
  </>
)}


      {/* Right Section - Cart Summary */}
      <div className="checkout-right">
        <YourOrder  cartItems={cartItems} setOrderData={setOrderData}/>
      </div>
    </div>
  );
};

export default CheckoutPageMain;
