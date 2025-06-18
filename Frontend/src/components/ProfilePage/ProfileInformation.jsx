import { useState } from 'react';
import { toast } from 'react-toastify';
import './ProfileInformation.css';

const ProfileInformation = () => {
    // Dummy initial data
    const initialData = {
        firstName: 'Abhipsha',
        lastName: 'Neog',
        gender: 'Female',
        email: 'abhipsha@example.com',
        phone: '9876543210',
        altPhone: ''
    };

    const [form, setForm] = useState(initialData);
    const [isEditing, setIsEditing] = useState(false);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleSave = () => {
        setIsEditing(false);
        toast.success('Changes updated and saved!');
        // Normally, you'd send this data to the backend here
    };

    return (
        <div className="profile-info-container">
            <h2>Personal Information</h2>

            <div className="profile-info-row">
                <div className="profile-info-field">
                    <label>First Name <span className="required">*</span></label>
                    <input
                        type="text"
                        name="firstName"
                        value={form.firstName}
                        onChange={handleChange}
                        disabled={!isEditing}
                        required
                    />
                </div>
                <div className="profile-info-field">
                    <label>Last Name <span className="required">*</span></label>
                    <input
                        type="text"
                        name="lastName"
                        value={form.lastName}
                        onChange={handleChange}
                        disabled={!isEditing}
                        required
                    />
                </div>
            </div>

            <div className="profile-info-gender">
                <label className='gender-field-heading'>Gender <span className="required">*</span></label>
                <label>
                    <input
                        type="radio"
                        name="gender"
                        value="Male"
                        checked={form.gender === 'Male'}
                        onChange={handleChange}
                        disabled={!isEditing}
                    /> <span>Male</span>
                </label>
                <label>
                    <input
                        type="radio"
                        name="gender"
                        value="Female"
                        checked={form.gender === 'Female'}
                        onChange={handleChange}
                        disabled={!isEditing}
                    /> <span>Female</span>
                </label>
            </div>

            <div className="profile-info-field">
                <label>E-Mail Address <span className="required">*</span></label>
                <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    disabled={!isEditing}
                    required
                />
            </div>

            <div className="profile-info-field">
                <label>Phone Number <span className="required">*</span></label>
                <input
                    type="text"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    disabled={!isEditing}
                    placeholder="10-digits number"
                    required
                />
            </div>

            <div className="profile-info-field">
                <label>Alternative Phone Number</label>
                <input
                    type="text"
                    name="altPhone"
                    value={form.altPhone}
                    onChange={handleChange}
                    disabled={!isEditing}
                    placeholder="10-digits number"
                />
            </div>

            <div className="profile-info-buttons">
                {!isEditing ? (
                    <button className="edit-button" onClick={handleEdit}>EDIT</button>
                ) : (
                    <button className="save-button" onClick={handleSave}>Save Details</button>
                )}
            </div>

           
        </div>
    );
};

export default ProfileInformation;
