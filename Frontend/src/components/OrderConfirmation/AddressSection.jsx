import PropTypes from "prop-types";
import React from "react";
import "./AddressSection.css";

const AddressSection = ({  shippingAddress }) => {
    const { name, street, city, state, zip, country, phone, email } = shippingAddress;
  return (
    <div className="address-section">
      <div className="shipping-address">
        <h3>Shipping Address</h3>
        <div className="address-grid">
          <div className="address-column">
            <p>
              <span>Name:</span> {name}
            </p>
            <p>
              <span>Street:</span> {street}
            </p>
            <p>
              <span>City:</span> {city}
            </p>
            <p>
              <span>State:</span> {state}
            </p>
          </div>
        
        <div className="address-column">
        <p>
          <span>ZIP:</span> {zip}
        </p>
        <p>
          <span>Country:</span> {country}
        </p>
        <p>
          <span>Phone:</span> {phone}
        </p>
        <p>
          <span>Email:</span> {email}
        </p>
        </div>
        </div>
      </div>
    </div>
  );
};

AddressSection.propTypes = {
   
    shippingAddress: PropTypes.shape({
      name: PropTypes.string.isRequired,
      street: PropTypes.string.isRequired,
      city: PropTypes.string.isRequired,
      state: PropTypes.string.isRequired,
      zip: PropTypes.string.isRequired,
      country: PropTypes.string.isRequired,
      phone: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,

    }).isRequired,
  };

export default AddressSection;
