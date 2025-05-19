import React, { useState } from "react";
import "./SavedUPI.css"; // Import CSS file

const SavedUPI = () => {
    // Dummy UPI data (replace later with API data)
    const [upiList, setUpiList] = useState([
        { id: 1, bank: "Axis Bank", upi: "9876543210@axl" },
        { id: 2, bank: "ICICI Bank", upi: "9876543210@ibl" },
        { id: 3, bank: "Axis Bank", upi: "9876543210@axl" },
        { id: 4, bank: "ICICI Bank", upi: "9876543210@ibl" },
        { id: 5, bank: "Axis Bank", upi: "9876543210@axl" },
        { id: 6, bank: "ICICI Bank", upi: "9876543210@ibl" },
    ]);

    const [newUpi, setNewUpi] = useState({ bank: "", upi: "" });
    const [editId, setEditId] = useState(null);
    const [showConfirm, setShowConfirm] = useState(null); // For delete confirmation

    // Handle adding new UPI
    const handleAddUPI = () => {
        if (!newUpi.bank || !newUpi.upi) return;
        setUpiList([...upiList, { id: Date.now(), ...newUpi }]);
        setNewUpi({ bank: "", upi: "" });
    };

    // Handle deleting a UPI after confirmation
    const handleDeleteUPI = (id) => {
        setUpiList(upiList.filter(upi => upi.id !== id));
        setShowConfirm(null);
    };

    // Handle editing a UPI
    const handleEditUPI = (id) => {
        const upiToEdit = upiList.find(upi => upi.id === id);
        setNewUpi(upiToEdit);
        setEditId(id);
    };

    // Handle saving an edited UPI
    const handleSaveEdit = () => {
        setUpiList(upiList.map(upi => upi.id === editId ? { ...newUpi, id: editId } : upi));
        setEditId(null);
        setNewUpi({ bank: "", upi: "" });
    };

    return (
        <div className="upi-container">
            <h2>Manage Saved UPI&#39s&#39</h2>
            <div className="upi-list">
                {upiList.map((upi) => (
                    <div className="upi-card" key={upi.id}>
                        <div>
                            <h3>{upi.bank} UPI ID</h3>
                            <p>{upi.upi}</p>
                        </div>
                        <div className="upi-actions">
                            <button className="edit-btn" onClick={() => handleEditUPI(upi.id)}>✏️</button>
                            <button className="delete-btn" onClick={() => setShowConfirm(upi.id)}>🗑️</button>
                        </div>

                        {showConfirm === upi.id && (
                            <div className="delete-confirm">
                                <p>Are you sure you want to delete?</p>
                                <button onClick={() => handleDeleteUPI(upi.id)}>Yes, Delete</button>
                                <button onClick={() => setShowConfirm(null)}>Cancel</button>
                            </div>
                        )}
                    </div>
                ))}
            </div>

            {/* Add / Edit UPI Form */}
            <div className="upi-form">
                <input
                    type="text"
                    placeholder="Bank Name"
                    value={newUpi.bank}
                    onChange={(e) => setNewUpi({ ...newUpi, bank: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="UPI ID"
                    value={newUpi.upi}
                    onChange={(e) => setNewUpi({ ...newUpi, upi: e.target.value })}
                />
                {editId ? (
                    <button className="save-btn" onClick={handleSaveEdit}>Save Changes</button>
                ) : (
                    <button className="add-btn" onClick={handleAddUPI}>Add UPI</button>
                )}
            </div>
        </div>
    );
};

export default SavedUPI;
