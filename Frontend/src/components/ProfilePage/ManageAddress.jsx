import { useState } from 'react';
import AddressModal from './AddressModal';
import './ManageAddress.css';

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
    ];
    



const ManageAddress = () => {
    const [addresses, setAddresses] = useState(initialAddresses);
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
        let updatedAddresses;
       // Ensure only one default address
        if (address.default) {
            updatedAddresses = addresses.map(a => ({
                ...a,
                default: false
            }));
        } else {
            updatedAddresses = [...addresses];
        }

        if (address.id) {
            // Edit existing address
            updatedAddresses = updatedAddresses.map(a =>
                a.id === address.id ? address : a
            );
        } else {
            // Add new address
            updatedAddresses.push({ ...address, id: Date.now() });
        }

        setAddresses(updatedAddresses);
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
                        {addr.type === 'Office' && (
                            <div className="office-days">
                                <p>Accept deliveries:</p>
                                <ul>
                                    <li>Saturday: {addr.officeDeliveries?.saturday ? 'Yes' : 'No'}</li>
                                    <li>Sunday: {addr.officeDeliveries?.sunday ? 'Yes' : 'No'}</li>
                                </ul>
                            </div>
                        )}
                        {addr.default && <p className="default-label">★ Default Address</p>}
                        <div className="address-actions">
                        <button onClick={() => openEditModal(addr)}>Edit</button>
                        <button onClick={() => deleteAddress(addr.id)}>Delete</button>
                            </div>
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
