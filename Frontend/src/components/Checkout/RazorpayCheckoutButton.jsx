// components/RazorpayCheckoutButton.jsx
import axios from 'axios';
import PropTypes from 'prop-types';
import { useEffect } from "react";

const RazorpayCheckoutButton = ({ user_id, address, setOrderData  }) => {

    useEffect(() => {
      console.log("🧾 RazorpayCheckoutButton mounted with user_id:", user_id);
        const script = document.createElement('script');
        script.src = 'https://checkout.razorpay.com/v1/checkout.js';
        script.async = true;
        document.body.appendChild(script);
      
        return () => {
          document.body.removeChild(script);
        };
      }, [user_id]);
      
  const handlePayment = async () => {
    console.log("🔐 user_id received in RazorpayCheckoutButton:", user_id);
   
    
    try {
      // 1. Create Order in backend
      const orderRes = await axios.post('http://localhost:5003/api/v1/orders', {
        user_id: user_id,
        shipping_address: `${address.firstName} ${address.lastName}, ${address.address}, ${address.city}, ${address.state} - ${address.pincode}`,
        payment_method: 'UPI', // or get from UI if you allow selection
      });

      const fullOrderResponse = orderRes.data?.data || orderRes.data;
      const order = fullOrderResponse.order;
      
      if (!order?.order_id || !order?.total_amount) {
        console.error("❌ Missing order_id or total_amount in response:", order);
        return;
      }

      if (typeof setOrderData === "function") {
        setOrderData(fullOrderResponse);
      }
      
      console.log("🔎 Full Order Object from Backend:", order);

      console.log("🛒 Sending payment data:", {
        order_id: order.order_id,
        amount: Number(order.total_amount),
        payment_method: 'UPI',
      });

      const paymentRes= await axios.post('http://localhost:5004/api/v1/payments/initiate', {
        order_id: order.order_id,
        amount: Number(order.total_amount),
        payment_method: 'UPI',
      });


      const { razorpay_order_id, amount, currency } = paymentRes.data;

      // 3. Load Razorpay UI
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: amount * 100, // in paise
        currency,
        name: 'My E-Commerce',
        description: 'Order Payment',
        order_id: razorpay_order_id,
        handler: function (response) {
          alert('Payment successful!');
          console.log("✅ Razorpay Response:", response);

          // Assuming you already have access to the order object (from earlier axios call)
          const orderId = order.order_id;

          // Redirect to the order confirmation page
          window.location.href = `/order-confirmation/${orderId}`;
        },
        prefill: {
          name: address.fullName,
          email: 'test@example.com',
          contact: address.phone,
        },
        theme: {
          color: '#3399cc',
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();

    } catch (err) {
      console.error("Checkout error:", err.message);
    }
  };

  return (
    <button
      onClick={handlePayment} 
    >
      Continue FOR Payment 
    </button>
  );
};

RazorpayCheckoutButton.propTypes = {
  user_id: PropTypes.string.isRequired,
  address: PropTypes.object.isRequired,
  setOrderData: PropTypes.func,
  };

export default RazorpayCheckoutButton;
