// src/pages/Checkout/AddressPage.jsx
import PropTypes from "prop-types";
import { useState } from "react";
//import { useNavigate } from "react-router-dom";
import "./AddressPage.css";

const AddressPage = ({onSubmit, defaultAddress }) => {
  //const navigate = useNavigate();
  const [address, setAddress] = useState(defaultAddress ||{
    fullName: "",
    phone: "",
    pincode: "",
    state: "",
    city: "",
    street: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setAddress({ ...address, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    const errs = {};
    if (!address.fullName) errs.fullName = "Name is required";
    if (!address.phone || !/^\d{10}$/.test(address.phone))
      errs.phone = "Valid phone required";
    if (!address.pincode || !/^\d{6}$/.test(address.pincode))
      errs.pincode = "Valid 6-digit pin required";
    if (!address.state) errs.state = "State is required";
    if (!address.city) errs.city = "City is required";
    if (!address.street) errs.street = "Street/Address is required";

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = () => {
    console.log("Submitting address:", address);
  
    if (validateForm()) {
      console.log("✅ Address is valid. Triggering onSubmit.");
      onSubmit(address); 
    } else {
      console.log("❌ Address validation failed", errors);
    }
  };
  

  return (
    <div className="address-container">
      <h2 className="address-heading">Shipping Address</h2>
      <div className="form-group">
      <label className="block font-medium text-sm mb-1">Full Name</label>
        <input
          name="fullName"
          style={{ textTransform: "capitalize" }}
          placeholder="Full Name"
          value={address.fullName}
          onChange={handleChange}
          className="form-input"
        />
        {errors.fullName && <p className="error-text">{errors.fullName}</p>}

        <label className="block font-medium text-sm mb-1">Phone Number</label>
        <input
          name="phone"
          style={{ textTransform: "capitalize" }}
          placeholder="Phone Number"
          value={address.phone}
          onChange={handleChange}
          className="form-input"
        />
        {errors.phone && <p className="error-text">{errors.phone}</p>}

        <label className="block font-medium text-sm mb-1">Pincode</label>
        <input
          name="pincode"
          style={{ textTransform: "capitalize" }}
          placeholder="Pincode"
          value={address.pincode}
          onChange={handleChange}
          className="form-input"
        />
        {errors.pincode && <p className="error-text">{errors.pincode}</p>}

        <label className="block font-medium text-sm mb-1">State</label>
        <input
          name="state"
          style={{ textTransform: "capitalize" }}
          placeholder="State"
          value={address.state}
          onChange={handleChange}
          className="form-input"
        />
        {errors.state && <p className="error-text">{errors.state}</p>}

        <label className="block font-medium text-sm mb-1">City</label>
        <input
          name="city"
          style={{ textTransform: "capitalize" }}
          placeholder="City"
          value={address.city}
          onChange={handleChange}
          className="form-input"
        />
        {errors.city && <p className="error-text">{errors.city}</p>}

        <label className="block font-medium text-sm mb-1">Landmark</label>
        <textarea
          name="street"
          style={{ textTransform: "capitalize" }}
          placeholder="Flat, Street, Building etc."
          value={address.street}
          onChange={handleChange}
          className="form-input"
        />
        {errors.street && <p className="error-text">{errors.street}</p>}

        <button
          onClick={handleSubmit}
          className="submit-button"
        >
          Continue to Payment
        </button>
      </div>
    </div>
  );
};

AddressPage.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  defaultAddress: PropTypes.object,
};

export default AddressPage;
