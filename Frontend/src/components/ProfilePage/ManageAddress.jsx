import React, { useState } from 'react';
import AddressModal from './AddressModal';
import './ManageAddress.css';

/*const initialAddresses = [
    { id: 1, name: "John Doe", address: "123 Main Street, City, State, 12345", phone: "9876543210", isEditing: false },
    { id: 2, name: "Jane Doe", address: "456 Market Street, City, State, 67890", phone: "9876543211", isEditing: false }
];*/

const ManageAddress = () => {
    const [addresses, setAddresses] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedAddress, setSelectedAddress] = useState(null);

    const openAddModal = () => {
        setSelectedAddress(null);
        setIsModalOpen(true);
    };

    const openEditModal = (address) => {
        setSelectedAddress(address);
        setIsModalOpen(true);
    };

    const saveAddress = (address) => {
        if (address.id) {
            setAddresses(addresses.map(a => a.id === address.id ? address : a));
        } else {
            setAddresses([...addresses, { ...address, id: Date.now() }]);
        }
        setIsModalOpen(false);
    };

    const deleteAddress = (id) => {
        setAddresses(addresses.filter(addr => addr.id !== id));
    };

    return (
<div className="manage-address-container">
            <h2>Manage Addresses</h2>

            <div className="address-list">
                {addresses.map(addr => (
                    <div key={addr.id} className="address-item">
                        <p><strong>{addr.firstName} {addr.lastName}</strong></p>
                        <p>{addr.address}, {addr.locality}, {addr.city}, {addr.state}, {addr.pincode}</p>
                        <p>Phone: {addr.phoneNumber}</p>
                        <p>Alternate: {addr.alternatePhone}</p>
                        <p>Type: {addr.type}</p>
                        <button onClick={() => openEditModal(addr)}>Edit</button>
                        <button onClick={() => deleteAddress(addr.id)}>Delete</button>
                    </div>
                ))}
            </div>

            <button className="add-address-button" onClick={openAddModal}>
                Add New Address
            </button>

            {isModalOpen && (
                <AddressModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    onSave={saveAddress}
                    addressToEdit={selectedAddress}
                />
            )}
        </div>
    );
};

export default ManageAddress;
