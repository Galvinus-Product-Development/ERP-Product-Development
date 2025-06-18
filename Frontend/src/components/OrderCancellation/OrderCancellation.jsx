import { useState } from "react";
import { useLocation } from 'react-router-dom';
import "./OrderCancellation.css"; // Importing the CSS file

const OrderCancellation = () => {
  const location = useLocation();
  const { orderStatus, paymentMethod } = location.state;
  const [selectedReason, setSelectedReason] = useState("");
  const [comments, setComments] = useState("");
  const [isCancelled, setIsCancelled] = useState(false);
  const [showBankDetails, setShowBankDetails] = useState(false);
  const [upiId, setUpiId] = useState("");
  const [bankDetails, setBankDetails] = useState({
    ifsc: "",
    accountNumber: "",
    confirmAccountNumber: "",
    accountHolderName: "",
    phoneNumber: ""
  });

  // Dynamic product details (Can be fetched from an API)
  const product = {
    name: "Shirt",
    description: "Formal Shirt for Men",
    size: "M",
    price: 5000,
    imageUrl: "https://woodmart.xtemos.com/wp-content/uploads/2016/09/product-furniture-18.jpg",
  };

  const reasons = [
    "Incorrect size order",
    "Product not required anymore",
    "Cash issue",
    "Order by mistake",
    "Want to change style/color",
    "Delayed Delivery Cancellation",
    "Duplicate Order",
    "Others",
  ];

  const handleRefund = () => {
    if (orderStatus === "Delivered" && paymentMethod === "COD") {
      setShowBankDetails(true);
      return;
    }
    
    // Simulate API call
    console.log("Refund Process Initiated", { selectedReason, comments });
    setIsCancelled(true);
  };

  const handleCancel = () => {
    // Simulate API call
    console.log("Order Cancellation Requested", { selectedReason, comments });
    setIsCancelled(true);
  };

  const handleBankDetailsSubmit = () => {
    // Validate bank details
    if (bankDetails.accountNumber !== bankDetails.confirmAccountNumber) {
      alert("Account numbers don't match");
      return;
    }
    
    // Simulate API call with bank details
    console.log("Refund with Bank Details", { ...bankDetails, selectedReason, comments });
    setIsCancelled(true);
  };

  const handleUpiSubmit = () => {
    if (!upiId) {
      alert("Please enter UPI ID");
      return;
    }
    
    // Simulate API call with UPI details
    console.log("Refund with UPI", { upiId, selectedReason, comments });
    setIsCancelled(true);
  };

  const handleBankDetailChange = (e) => {
    const { name, value } = e.target;
    setBankDetails(prev => ({ ...prev, [name]: value }));
  };

  // Determine the action button based on order status and payment method
  const getActionButton = () => {
    if (orderStatus === "Confirmed") {
      if (paymentMethod === "COD") {
        return <button className="cancel-button" onClick={handleCancel}>CANCEL ORDER</button>;
      } else {
        return <button className="refund-button" onClick={handleRefund}>REFUND</button>;
      }
    } else if (orderStatus === "Delivered") {
      if (paymentMethod === "COD") {
        return <button className="return-button" onClick={handleRefund}>RETURN</button>;
      } else {
        return <button className="refund-button" onClick={handleRefund}>REFUND</button>;
      }
    }
    return null;
  };

  if (isCancelled) {
    return (
      <div className="confirmation-container">
        <div className="check-icon">✔</div>
        <h3>{orderStatus === "Confirmed" ? "Order Cancelled" : "Return Initiated"}</h3>
        <div className="product-info">
          <img src={product.imageUrl} alt={product.name} className="product-image" />
          <div>
            <h3>{product.name}</h3>
            <p>{product.description}</p>
          </div>
        </div>
        <h4>Refund Details</h4>
        <p>A refund of <strong>${product.price}</strong> will be processed.</p>
        <h4>Refund Tracking</h4>
        <p>Please check your orders page to track the refund status.</p>
        <button className="done-button" onClick={() => alert("Redirecting to Orders Page")}>DONE</button>
      </div>
    );
  }

  if (showBankDetails) {
    return (
      <div className="bank-details-container">
        <h2>Refund Details</h2>
        <div className="product-info">
          <img src={product.imageUrl} alt={product.name} className="product-image" />
          <div>
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <p>Refund Amount: <strong>${product.price}</strong></p>
          </div>
        </div>

        <div className="payment-options">
          <div className="option">
            <h3>Bank Account via UPI</h3>
            <div className="input-group">
              <label>Existing UPI ID</label>
              <input 
                type="text" 
                placeholder="Enter UPI ID" 
                value={upiId}
                onChange={(e) => setUpiId(e.target.value)}
              />
            </div>
            <button className="add-button">+ Add a New UPI ID</button>
          </div>

          <div className="option">
            <h3>Bank Account</h3>
            <div className="input-group">
              <label>IFSC Code</label>
              <input 
                type="text" 
                name="ifsc"
                value={bankDetails.ifsc}
                onChange={handleBankDetailChange}
              />
            </div>
            <div className="input-group">
              <label>Account Number</label>
              <input 
                type="text" 
                name="accountNumber"
                value={bankDetails.accountNumber}
                onChange={handleBankDetailChange}
              />
            </div>
            <div className="input-group">
              <label>Confirm Account Number</label>
              <input 
                type="text" 
                name="confirmAccountNumber"
                value={bankDetails.confirmAccountNumber}
                onChange={handleBankDetailChange}
              />
            </div>
            <div className="input-group">
              <label>Account Holder Name</label>
              <input 
                type="text" 
                name="accountHolderName"
                value={bankDetails.accountHolderName}
                onChange={handleBankDetailChange}
              />
            </div>
            <div className="input-group">
              <label>Phone Number</label>
              <input 
                type="text" 
                name="phoneNumber"
                value={bankDetails.phoneNumber}
                onChange={handleBankDetailChange}
              />
            </div>
            <button className="add-button">+ Add a New Account</button>
          </div>

          <div className="pickup-section">
            <h3>Pickup And Delivery</h3>
            <div className="input-group">
              <label>Name, Phone Number</label>
              <input type="text" placeholder="Enter name and phone" />
            </div>
            <div className="input-group">
              <label>Village Taluk, District. Pincode</label>
              <input type="text" placeholder="Enter address details" />
            </div>
          </div>

          <button className="submit-button" onClick={upiId ? handleUpiSubmit : handleBankDetailsSubmit}>
            Submit Request
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="order-cancel-container">
      <div className="form-container">
        <div className="product-info">
          <img src={product.imageUrl} alt={product.name} className="product-image" />
          <div>
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <p>Size: {product.size}</p>
            <p>${product.price}</p>
          </div>
        </div>

        <h4>Reason for Cancellation</h4>
        <p>Please select the correct reason to improve our service</p>

        <div className="reason-list">
          {reasons.map((reason, index) => (
            <div key={index} className="radio-item">
              <input
                type="radio"
                name="cancelReason"
                value={reason}
                onChange={(e) => setSelectedReason(e.target.value)}
              />
              <label>{reason}</label>
            </div>
          ))}
        </div>

        {selectedReason === "Others" && (
          <textarea
            placeholder="Additional Comments"
            className="comments-textarea"
            value={comments}
            onChange={(e) => setComments(e.target.value)}
          />
        )}

        <div className="refund-section">
          <p>Refund Details: <strong>${product.price}</strong></p>
          {getActionButton()}
        </div>
      </div>
    </div>
  );
};



export default OrderCancellation;
// import { useState } from "react";
// import "./OrderCancellation.css"; // Importing the CSS file

// const OrderCancellation = () => {
//   const [selectedReason, setSelectedReason] = useState("");
//   const [comments, setComments] = useState("");
//   const [isCancelled, setIsCancelled] = useState(false);

//   // Dynamic product details (Can be fetched from an API)
//   const product = {
//     name: "Shirt",
//     description: "Formal Shirt for Men",
//     size: "M",
//     price: 5000,
//     imageUrl: "https://woodmart.xtemos.com/wp-content/uploads/2016/09/product-furniture-18.jpg", // Replace with actual image URL
//   };

//   const reasons = [
//     "Incorrect size order",
//     "Product not required anymore",
//     "Cash issue",
//     "Order by mistake",
//     "Want to change style/color",
//     "Delayed Delivery Cancellation",
//     "Duplicate Order",
//     "Others",
//   ];

//   const handleRefund = () => {
//     // Simulate API call
//     console.log("Refund Process Initiated", { selectedReason, comments });
//     setIsCancelled(true);
//   };

//   return (
//     <div className="order-cancel-container">
//       {!isCancelled ? (
//         <div className="form-container">
//           <div className="product-info">
//             <img src={product.imageUrl} alt={product.name} className="product-image" />
//             <div>
//               <h3>{product.name}</h3>
//               <p>{product.description}</p>
//               <p>Size: {product.size}</p>
//               <p>${product.price}</p>
//             </div>
//           </div>

//           <h4>Reason for Cancellation</h4>
//           <p>Please select the correct reason to improve our service</p>

//           <div className="reason-list">
//             {reasons.map((reason, index) => (
//               <div key={index} className="radio-item">
//                 <input
//                   type="radio"
//                   name="cancelReason"
//                   value={reason}
//                   onChange={(e) => setSelectedReason(e.target.value)}
//                 />
//                 <label>{reason}</label>
//               </div>
//             ))}
//           </div>

//           {selectedReason === "Others" && (
//             <textarea
//               placeholder="Additional Comments"
//               className="comments-textarea"
//               value={comments}
//               onChange={(e) => setComments(e.target.value)}
//             />
//           )}

//           <div className="refund-section">
//             <p>Refund Details: <strong>${product.price}</strong></p>
//             <button className="refund-button" onClick={handleRefund}>REFUND</button>
//           </div>
//         </div>
//       ) : (
//         <div className="confirmation-container">
//           <div className="check-icon">✔</div>
//           <h3>Order Cancelled</h3>
//           <div className="product-info">
//             <img src={product.imageUrl} alt={product.name} className="product-image" />
//             <div>
//               <h3>{product.name}</h3>
//               <p>{product.description}</p>
//             </div>
//           </div>
//           <h4>Refund Details</h4>
//           <p>A refund of <strong>${product.price}</strong> will be processed.</p>
//           <h4>Refund Tracking</h4>
//           <p>Please check your orders page to track the refund status.</p>
//           <button className="done-button" onClick={() => alert("Redirecting to Orders Page")}>DONE</button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default OrderCancellation;
