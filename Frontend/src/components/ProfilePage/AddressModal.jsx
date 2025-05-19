import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import './AddressModal.css';

const initialFormState = {
    firstName: '',
    lastName: '',
    phoneNumber: '',
    alternatePhone: '',
    pincode: '',
    locality: '',
    address: '',
    city: '',
    state: '',
    type: 'Home',  // Default to 'Home'
};

const states = [
    'Assam', 'Bihar', 'Delhi', 'Goa', 'Gujarat', 'Karnataka', 'Maharashtra', 'Tamil Nadu', 'West Bengal'
];

const AddressModal = ({ isOpen, onClose, onSave, addressToEdit }) => {
    const [formData, setFormData] = useState(initialFormState);

    useEffect(() => {
        if (addressToEdit) {
            setFormData(addressToEdit);
        } else {
            setFormData(initialFormState);
        }
    }, [addressToEdit]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = () => {
        onSave(formData);
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-container">
                <h2>{addressToEdit ? 'Edit Address' : 'Add New Address'}</h2>

                <div className="form-row">
                    <input type="text" placeholder="First Name" name="firstName" value={formData.firstName} onChange={handleChange} />
                    <input type="text" placeholder="Last Name" name="lastName" value={formData.lastName} onChange={handleChange} />
                </div>

                <div className="form-row">
                    <input type="text" placeholder="Phone Number" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} />
                    <input type="text" placeholder="Alternate Phone Number" name="alternatePhone" value={formData.alternatePhone} onChange={handleChange} />
                </div>

                <div className="form-row">
                    <input type="text" placeholder="Pincode" name="pincode" value={formData.pincode} onChange={handleChange} />
                    <input type="text" placeholder="Locality" name="locality" value={formData.locality} onChange={handleChange} />
                </div>

                <div className="form-row">
                    <input type="text" placeholder="Address" name="address" value={formData.address} onChange={handleChange} />
                </div>

                <div className="form-row">
                    <input type="text" placeholder="City/Town" name="city" value={formData.city} onChange={handleChange} />
                    <select name="state" value={formData.state} onChange={handleChange}>
                        <option value="">Select State</option>
                        {states.map(state => (
                            <option key={state} value={state}>{state}</option>
                        ))}
                    </select>
                </div>

                <div className="form-row">
                    <label>
                        <input type="radio" name="type" value="Home" checked={formData.type === 'Home'} onChange={handleChange} /> Home
                    </label>
                    <label>
                        <input type="radio" name="type" value="Office" checked={formData.type === 'Office'} onChange={handleChange} /> Office
                    </label>
                </div>

                <div className="modal-actions">
                    <button className="save-btn" onClick={handleSubmit}>Save</button>
                    <button className="cancel-btn" onClick={onClose}>Cancel</button>
                </div>
            </div>
        </div>
    );
};

AddressModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    onSave: PropTypes.func.isRequired,
    addressToEdit: PropTypes.shape({
        firstName: PropTypes.string,
        lastName: PropTypes.string,
        phoneNumber: PropTypes.string,
        alternatePhone: PropTypes.string,
        pincode: PropTypes.string,
        locality: PropTypes.string,
        address: PropTypes.string,
        city: PropTypes.string,
        state: PropTypes.string,
        type: PropTypes.string,
        id: PropTypes.number
    })
};

export default AddressModal;
