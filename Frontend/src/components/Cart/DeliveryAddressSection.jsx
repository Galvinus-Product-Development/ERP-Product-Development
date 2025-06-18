import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import AddressSelectorModal from "./AddressSelectorModal";
import "./deliveryAddress.css";

const DeliveryAddressSection = ({onAddressSubmit}) => {
  const [selectedAddress, setSelectedAddress] = useState({
    firstName: "Abhipsha",
    lastName: "Neog",
    address: "House No. 123, ABC Building",
    city: "Jorhat",
    state: "Assam",
    pincode: "785001",
  });
  const [isSelectorOpen, setIsSelectorOpen] = useState(false);
  useEffect(() => {
    // Whenever address is selected or updated, notify parent
    if (onAddressSubmit && typeof onAddressSubmit === "function") {
      onAddressSubmit(selectedAddress);
    }
  }, [selectedAddress]);

  
  return (
    <div className="delivery-address">
      <h3>Delivery Address</h3>
      <div className="address-row">
        <div className="address-details">
        <p><strong>{selectedAddress.firstName} {selectedAddress.lastName}</strong></p>
        <p>{selectedAddress.address}, {selectedAddress.city}, {selectedAddress.state}</p>
          <p>Pincode: {selectedAddress.pincode}</p>
        </div>
        <button className="change-address-btn" onClick={() => setIsSelectorOpen(true)}>
          Change Address
        </button>
      </div>
      {isSelectorOpen && (
        <AddressSelectorModal
          onClose={() => setIsSelectorOpen(false)}
          onSelect={(addr) => {
            setSelectedAddress(addr);
            setIsSelectorOpen(false);
          }}
        />
      )}
    </div>
  );
};

DeliveryAddressSection.propTypes = {
  onAddressSubmit: PropTypes.func.isRequired,
};

export default DeliveryAddressSection;
