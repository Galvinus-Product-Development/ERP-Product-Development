import { useState } from "react";
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
    const [showUpiModal, setShowUpiModal] = useState(false);
    
    
    const openAddModal = () => {
        setEditId(null);
        setNewUpi({ bank: "", upi: "" });
        setShowUpiModal(true);
    };

    // Handle deleting a UPI after confirmation
    const handleDeleteUPI = (id) => {
        setUpiList(upiList.filter(upi => upi.id !== id));
        setShowConfirm(null);
    };

    // Handle editing a UPI
    const handleEditUPI = (id) => {
        const upiToEdit = upiList.find((upi) => upi.id === id);
        setNewUpi(upiToEdit);
        setEditId(id);
        setShowUpiModal(true);
      };
    // Handle saving an edited UPI
    const handleSaveUpi = () => {
        if (!newUpi.bank || !newUpi.upi) return;

        if (editId) {
          setUpiList(upiList.map((upi) => (upi.id === editId ? { ...newUpi, id: editId } : upi)));
        } else {
          setUpiList([...upiList, { id: Date.now(), ...newUpi }]);
        }
    
        setNewUpi({ bank: "", upi: "" });
        setEditId(null);
        setShowUpiModal(false);
    };
    

    return (
        <div className="upi-container">
            <h2>Manage Saved UPI</h2>
            <div className="add-upi-button-container">
                <button className="add-btn" onClick={openAddModal}>➕ Add New UPI</button>
            </div>
        <div className="upi-list">
          {upiList.map((upi) => (
            <div className="upi-card" key={upi.id}>
              <div>
                <h3>{upi.bank} UPI ID</h3>
                <p>{upi.upi}</p>
              </div>
              <div className="upi-actions">
                <button className="edit-btn" onClick={() => handleEditUPI(upi.id)}>
                  ✏️
                </button>
                <button className="delete-btn" onClick={() => setShowConfirm(upi.id)}>
                  🗑️
                </button>
              </div>
            </div>
          ))}
            </div>
            
            
  
  
        {/* Delete Confirmation Modal */}
        {showConfirm !== null && (
          <div className="modal-overlay">
            <div className="modal">
              <p>Are you sure you want to delete this UPI?</p>
              <div className="modal-actions">
                <button className="confirm-btn" onClick={() => handleDeleteUPI(showConfirm)}>
                  Yes, Delete
                </button>
                <button className="cancel-btn" onClick={() => setShowConfirm(null)}>
                  Cancel
                </button>
              </div>
            </div>
          </div>
            )}
            
      {/* Add/Edit UPI Modal */}
      {showUpiModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>{editId ? "Edit UPI" : "Add New UPI"}</h3>
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
            <div className="modal-actions">
              <button className="save-btn" onClick={handleSaveUpi}>
                {editId ? "Save Changes" : "Add UPI"}
              </button>
              <button className="cancel-btn" onClick={() => setShowUpiModal(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
  
export default SavedUPI;
