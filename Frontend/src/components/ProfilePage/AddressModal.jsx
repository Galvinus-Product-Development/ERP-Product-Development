import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { FaMapMarkerAlt } from 'react-icons/fa';
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
    country: '',
    type: 'Home',
    default: false,
    officeDeliveries: {
        saturday: false,
        sunday: false
    }
};


const states = [
    'Assam', 'Bihar', 'Delhi', 'Goa', 'Gujarat', 'Karnataka', 'Maharashtra', 'Tamil Nadu', 'West Bengal'
];
const countries = ['India', 'United States', 'Canada', 'Australia', 'United Kingdom'];

const AddressModal = ({ isOpen, onClose, onSave, addressToEdit }) => {
    const [formData, setFormData] = useState(initialFormState);
    const apiKey = import.meta.env.VITE_GOOGLE_API_KEY;

    useEffect(() => {
        if (addressToEdit) {
            setFormData(addressToEdit);
        } else {
            setFormData(initialFormState);
        }
    }, [addressToEdit]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;

        if (name === 'default') {
            setFormData({ ...formData, default: checked });
        } else if (name === 'saturday' || name === 'sunday') {
            setFormData({
                ...formData,
                officeDeliveries: {
                    ...formData.officeDeliveries,
                    [name]: checked
                }
            });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleUseCurrentLocation = () => {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            async (position) => {
                  const { latitude, longitude } = position.coords;
                 
              console.log('Latitude:', latitude, 'Longitude:', longitude);
              try {
                const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${apiKey}`);
                  const data = await response.json();
                  console.log('Full Geocode Data:', data);

                  console.log('All Results:', data.results.map(r => r.formatted_address));
                
                if (data.status === 'OK' && data.results.length > 0) {
                  const addressComponents = data.results[0].address_components;
                  const formattedAddress = data.results[0].formatted_address;
      
                  // Extract components
                  const getComponent = (types) => {
                    const comp = addressComponents.find(component =>
                      types.every(type => component.types.includes(type))
                    );
                    return comp ? comp.long_name : '';
                  };
      
                  const city = getComponent(['locality']) || getComponent(['administrative_area_level_2']);
                  const state = getComponent(['administrative_area_level_1']);
                  const country = getComponent(['country']);
                  const pincode = getComponent(['postal_code']);
      
                  // Update formData
                  setFormData(prev => ({
                    ...prev,
                    address: formattedAddress,
                    city: city,
                    state: state,
                    country: country,
                    pincode: pincode,
                  }));
                } else {
                  alert('Unable to retrieve address from your location.');
                }
              } catch (error) {
                console.error('Error during reverse geocoding:', error);
                alert('Error fetching address. Please try again.');
              }
            },
            (error) => {
              alert('Unable to retrieve your location. Please check permissions.');
              console.error(error);
            }
          );
        } else {
          alert('Geolocation is not supported by this browser.');
        }
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
                    <input type="text" name="firstName" placeholder="First Name *" value={formData.firstName} onChange={handleChange} required />
                    <input type="text" name="lastName" placeholder="Last Name *" value={formData.lastName} onChange={handleChange} required />
                </div>

                <div className="form-row">
                    <input type="text" name="phoneNumber" placeholder="Phone Number *" value={formData.phoneNumber} onChange={handleChange} required />
                    <input type="text" name="alternatePhone" placeholder="Alternate Phone" value={formData.alternatePhone} onChange={handleChange} />
                </div>

                <div className="form-row">
                    <input type="text" name="pincode" placeholder="Pincode *" value={formData.pincode} onChange={handleChange} required />
                    <input type="text" name="locality" placeholder="Locality *" value={formData.locality} onChange={handleChange} required />
                </div>

                <div className="form-row">
                    <input type="text" name="address" placeholder="House No., Building, Street *" value={formData.address} onChange={handleChange} required />
                    
                </div>

                <div className="form-row">
                    <input type="text" name="city" placeholder="City/Town *" value={formData.city} onChange={handleChange} required />
                    <select name="state" value={formData.state} onChange={handleChange} required>
                        <option value="">Select State</option>
                        {states.map(state => (
                            <option key={state} value={state}>{state}</option>
                        ))}
                    </select>
                </div>

                <div className="form-row">
                    <select name="country" value={formData.country} onChange={handleChange} required>
                        <option value="">Select Country</option>
                        {countries.map(country => (
                            <option key={country} value={country}>{country}</option>
                        ))}
                    </select>
                    <button className="use-location-btn" onClick={handleUseCurrentLocation}>
                        <FaMapMarkerAlt style={{ marginRight: '6px' }} />
                        Use My Current Location
                    </button>
                    <label className="checkbox-label">
                        <input type="checkbox" name="default" checked={formData.default} onChange={handleChange} />
                        Make this my default address
                    </label>
                </div>

                <div className="form-row">
                    <label>
                        <input type="radio" name="type" value="Home" checked={formData.type === 'Home'} onChange={handleChange} />
                        Home
                    </label>
                    <label>
                        <input type="radio" name="type" value="Office" checked={formData.type === 'Office'} onChange={handleChange} />
                        Office
                    </label>
                </div>

                {formData.type === 'Office' && (
                    <div className="form-row">
                        <label>
                            <input type="checkbox" name="saturday" checked={formData.officeDeliveries.saturday} onChange={handleChange} />
                            Accept deliveries on Saturday
                        </label>
                        <label>
                            <input type="checkbox" name="sunday" checked={formData.officeDeliveries.sunday} onChange={handleChange} />
                            Accept deliveries on Sunday
                        </label>
                    </div>
                )}
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
        country: PropTypes.string,
        type: PropTypes.string,
       
    })
};

export default AddressModal;
