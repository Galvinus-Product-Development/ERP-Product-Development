import React, { useState } from 'react';
import './ProfileInformation.css'; // Import the CSS file

const ProfileInformation = () => {
    const [form, setForm] = useState({
        firstName: '',
        lastName: '',
        gender: '',
        email: '',
        phone: '',
        altPhone: ''
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    return (
        <div className="profile-info-container">
            <h2>Personal Information</h2>

            <div className="profile-info-row">
                <div className="profile-info-field">
                    <label>First Name*</label>
                    <input
                        type="text"
                        name="firstName"
                        value={form.firstName}
                        onChange={handleChange}
                    />
                </div>
                <div className="profile-info-field">
                    <label>Last Name</label>
                    <input
                        type="text"
                        name="lastName"
                        value={form.lastName}
                        onChange={handleChange}
                    />
                </div>
            </div>

            <div className="profile-info-gender">
                <label>Gender</label>
                <label><input type="radio" name="gender" value="Male" onChange={handleChange} /> Male</label>
                <label><input type="radio" name="gender" value="Female" onChange={handleChange} /> Female</label>
            </div>

            <div className="profile-info-field">
                <label>E-Mail Address</label>
                <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                />
            </div>

            <div className="profile-info-field">
                <label>Phone Number</label>
                <input
                    type="text"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="10-digits number"
                />
            </div>

            <div className="profile-info-field">
                <label>Alternative Phone Number</label>
                <input
                    type="text"
                    name="altPhone"
                    value={form.altPhone}
                    onChange={handleChange}
                    placeholder="10-digits number"
                />
            </div>

            <div className="profile-info-buttons">
                <button className="edit-button">EDIT</button>
                <button className="save-button">Save Details</button>
            </div>
        </div>
    );
};

export default ProfileInformation;
