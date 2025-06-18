import { useState } from 'react';
import AddressModal from '../ProfilePage//AddressModal';
import './AddressSelectorModal.css';

const initialAddresses = [
    {
        id: 1,
        firstName: 'Abhipsha',
        lastName: 'Neog',
        phoneNumber: '9876543210',
        alternatePhone: '9876543211',
        pincode: '781001',
        locality: 'Silpukhuri',
        address: 'House No. 123, ABC Building',
        city: 'Guwahati',
        state: 'Assam',
        country: 'India',
        type: 'Home',
        default: true,
        officeDeliveries: {
            saturday: false,
            sunday: false
        }
    },
    {
        id: 2,
        firstName: 'Raj',
        lastName: 'Sharma',
        phoneNumber: '9123456789',
        alternatePhone: '',
        pincode: '400001',
        locality: 'Fort',
        address: 'Flat 501, XYZ Tower',
        city: 'Mumbai',
        state: 'Maharashtra',
        country: 'India',
        type: 'Office',
        default: false,
        officeDeliveries: {
            saturday: true,
            sunday: true
        }
    },
    {
        id: 3,
        firstName: 'Meera',
        lastName: 'Das',
        phoneNumber: '9988776655',
        alternatePhone: '9988776644',
        pincode: '700001',
        locality: 'Salt Lake',
        address: 'G-14, Green Residency',
        city: 'Kolkata',
        state: 'West Bengal',
        country: 'India',
        type: 'Home',
        default: false,
        officeDeliveries: {
            saturday: false,
            sunday: false
        }
    }
  // your initial addresses here (you can fetch from backend later)
];

const AddressSelectorModal = ({ onClose, onSelect }) => {
  const [addresses, setAddresses] = useState(initialAddresses);
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
  const [addressToEdit, setAddressToEdit] = useState(null);

  const handleSaveAddress = (newAddress) => {
    let updated = addresses;

    if (newAddress.default) {
      updated = updated.map(a => ({ ...a, default: false }));
    }

    if (newAddress.id) {
      updated = updated.map(a => a.id === newAddress.id ? newAddress : a);
    } else {
      updated = [...updated, { ...newAddress, id: Date.now() }];
    }

    setAddresses(updated);
    setIsAddressModalOpen(false);
  };

  const handleSelect = (addr) => {
    onSelect(addr);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
  <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        <h2>Select Delivery Address</h2>

        {addresses.map(addr => (
          <div key={addr.id} className="address-item">
            <p><strong>{addr.firstName} {addr.lastName}</strong></p>
            <p>{addr.address}, {addr.locality}, {addr.city}, {addr.state}, {addr.pincode}</p>
            <p>Phone: {addr.phoneNumber}</p>
            {addr.default && <p className="default-label">★ Default Address</p>}
            <div className="modal-addresscart-actions">
              <button onClick={() => handleSelect(addr)}>Deliver Here</button>
              <button onClick={() => { setAddressToEdit(addr); setIsAddressModalOpen(true); }}>Edit</button>
            </div>
          </div>
        ))}

        <button className="add-addresscart-button" onClick={() => { setAddressToEdit(null); setIsAddressModalOpen(true); }}>
          Add New Address
        </button>

        {isAddressModalOpen && (
          <AddressModal
            isOpen={isAddressModalOpen}
            onClose={() => setIsAddressModalOpen(false)}
            onSave={handleSaveAddress}
            addressToEdit={addressToEdit}
          />
        )}
      </div>
    </div>
  );
};

export default AddressSelectorModal;
