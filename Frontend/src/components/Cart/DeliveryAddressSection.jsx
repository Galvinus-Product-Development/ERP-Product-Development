import React, { useState } from "react";
import "./deliveryAddress.css";

const DeliveryAddressSection = () => {
  const [selectedAddress, setSelectedAddress] = useState({
    name: "Abhipsha Neog",
    location: "Jorhat, Assam",
    pincode: "785001",
  });

  const handleChangeAddress = () => {
    alert("Address change modal (not yet implemented)");
  };

  return (
    <div className="delivery-address">
      <h3>Delivery Address</h3>
      <p><strong>{selectedAddress.name}</strong></p>
      <p>{selectedAddress.location}</p>
      <p>Pincode: {selectedAddress.pincode}</p>
      <button className="change-address-btn" onClick={handleChangeAddress}>
        Change Address
      </button>
    </div>
  );
};

export default DeliveryAddressSection;
