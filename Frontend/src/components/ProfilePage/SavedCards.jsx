import React, { useState } from "react";
import "./SavedCards.css"; // Import CSS file

const maskCardNumber = (cardNumber) => {
    if (cardNumber.length < 16) return cardNumber;
    return "**** **** **** " + cardNumber.slice(-4); // Mask first 12 digits
};

const SavedCards = () => {
    // Dummy card data (store full card number internally)
    const [cardList, setCardList] = useState([
        { id: 1, bank: "HDFC Bank", cardNumber: "1234567812341234", expiry: "06/27" },
        { id: 2, bank: "SBI Bank", cardNumber: "5678567856785678", expiry: "12/26" },
        { id: 3, bank: "HDFC Bank", cardNumber: "1234567812341234", expiry: "06/27" },
        { id: 4, bank: "SBI Bank", cardNumber: "5678567856785678", expiry: "12/26" },
        { id: 5, bank: "HDFC Bank", cardNumber: "1234567812341234", expiry: "06/27" },
        { id: 6, bank: "SBI Bank", cardNumber: "5678567856785678", expiry: "12/26" },
    ]);

    const [newCard, setNewCard] = useState({ bank: "", cardNumber: "", expiry: "" });
    const [editId, setEditId] = useState(null);
    const [modalType, setModalType] = useState(null);
    const [deleteCardId, setDeleteCardId] = useState(null); // For delete confirmation

    // Handle adding a new card
    const handleAddCard = () => {
        if (!newCard.bank || newCard.cardNumber.length !== 16 || !newCard.expiry) return;
        setCardList([...cardList, { id: Date.now(), ...newCard }]); // Store full card number
        setNewCard({ bank: "", cardNumber: "", expiry: "" });
        setModalType(null);
    };

    // Handle deleting a card after confirmation
    const handleDeleteCard = () => {
        setCardList(cardList.filter(card => card.id !== deleteCardId));
        setModalType(null);
    };

    // Handle editing a card
    const handleEditCard = (id) => {
        const cardToEdit = cardList.find(card => card.id === id);
        setNewCard({ ...cardToEdit }); // Get full card number
        setEditId(id);
        setModalType("edit");
    };

    // Handle saving an edited card
    const handleSaveEdit = () => {
        if (newCard.cardNumber.length !== 16) return;
        setCardList(cardList.map(card => 
            card.id === editId ? { ...newCard, id: editId } : card
        ));
        setEditId(null);
        setNewCard({ bank: "", cardNumber: "", expiry: "" });
        setModalType(null);
    };

    return (
        <div className="cards-container">
            <h2>Manage Saved Cards</h2>
            <button className="add-btn" onClick={() => setModalType("add")}>+ Add New Card</button>

            <div className="cards-list">
                {cardList.map((card) => (
                    <div className="card-item" key={card.id}>
                        <div>
                            <h3>{card.bank}</h3>
                            <p>Card: {maskCardNumber(card.cardNumber)}</p> {/* Masked for display */}
                            <p>Expiry: {card.expiry}</p>
                        </div>
                        <div className="card-actions">
                            <button className="edit-btn" onClick={() => handleEditCard(card.id)}>✏️</button>
                            <button className="delete-btn" onClick={() => { setModalType("delete"); setDeleteCardId(card.id); }}>🗑️</button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Add / Edit Card Modal */}
            {(modalType === "add" || modalType === "edit") && (
                <div className="modal-overlay">
                    <div className="modal">
                        <h3>{modalType === "add" ? "Add New Card" : "Edit Card"}</h3>
                        <input
                            type="text"
                            placeholder="Bank Name"
                            value={newCard.bank}
                            onChange={(e) => setNewCard({ ...newCard, bank: e.target.value })}
                        />
                        <input
                            type="text"
                            placeholder="Card Number (16 Digits)"
                            maxLength={16}
                            value={newCard.cardNumber}
                            onChange={(e) => setNewCard({ ...newCard, cardNumber: e.target.value.replace(/\D/g, "") })}
                        />
                        <input
                            type="text"
                            placeholder="Expiry (MM/YY)"
                            value={newCard.expiry}
                            onChange={(e) => setNewCard({ ...newCard, expiry: e.target.value })}
                        />
                        <div className="modal-actions">
                            {modalType === "edit" ? (
                                <button className="save-btn" onClick={handleSaveEdit}>Save Changes</button>
                            ) : (
                                <button className="add-btn" onClick={handleAddCard}>Add Card</button>
                            )}
                            <button className="cancel-btn" onClick={() => setModalType(null)}>Cancel</button>
                        </div>
                    </div>
                </div>
            )}

            {/* Delete Confirmation Modal */}
            {modalType === "delete" && (
                <div className="modal-overlay">
                    <div className="modal">
                        <p>Are you sure you want to delete this card?</p>
                        <div className="modal-actions">
                            <button className="delete-confirm-btn" onClick={handleDeleteCard}>Yes, Delete</button>
                            <button className="cancel-btn" onClick={() => setModalType(null)}>Cancel</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SavedCards;
/*import React, { useState } from "react";
import "./SavedCards.css"; // Import CSS file

const maskCardNumber = (cardNumber) => {
    if (cardNumber.length < 16) return cardNumber; 
    return "**** **** **** " + cardNumber.slice(-4); // Mask first 12 digits
};

const SavedCards = () => {
    // Dummy card data (replace later with API data)
    const [cardList, setCardList] = useState([
        { id: 1, bank: "HDFC Bank", cardNumber: "**** **** **** 1234", expiry: "06/27" },
        { id: 2, bank: "SBI Bank", cardNumber: "**** **** **** 5678", expiry: "12/26" }
    ]);

    const [newCard, setNewCard] = useState({ bank: "", cardNumber: "", expiry: "" });
    const [editId, setEditId] = useState(null);
    const [modalType, setModalType] = useState(null);
    const [deleteCardId, setDeleteCardId] = useState(null);// For delete confirmation

    // Handle adding a new card
    const handleAddCard = () => {
        if (!newCard.bank || newCard.cardNumber.length !== 16 || !newCard.expiry) return;
        setCardList([...cardList, { id: Date.now(), ...newCard, cardNumber: maskCardNumber(newCard.cardNumber) }]);
        setNewCard({ bank: "", cardNumber: "", expiry: "" });
        setModalType(null);
    };

    // Handle deleting a card after confirmation
    const handleDeleteCard = () => {
        setCardList(cardList.filter(card => card.id !== deleteCardId));
        setModalType(null);
    };

    // Handle editing a card
    const handleEditCard = (id) => {
        const cardToEdit = cardList.find(card => card.id === id);
        setNewCard({ ...cardToEdit, cardNumber: cardToEdit.cardNumber.replace(/\D/g, "") });
        setEditId(id);
        setModalType("edit");
    };

    // Handle saving an edited card
    const handleSaveEdit = () => {
        if (newCard.cardNumber.length !== 16) return;
        setCardList(cardList.map(card => card.id === editId ? { ...newCard, id: editId, cardNumber: maskCardNumber(newCard.cardNumber) } : card));
        setEditId(null);
        setNewCard({ bank: "", cardNumber: "", expiry: "" });
        setModalType(null);
    };

    return (
         <div className="cards-container">
    <h2>Manage Saved Cards</h2>
    <button className="add-btn" onClick={() => setModalType("add")}>+ Add New Card</button>

    <div className="cards-list">
        {cardList.map((card) => (
            <div className="card-item" key={card.id}>
                <div>
                    <h3>{card.bank}</h3>
                    <p>Card: {card.cardNumber}</p>
                    <p>Expiry: {card.expiry}</p>
                </div>
                <div className="card-actions">
                    <button className="edit-btn" onClick={() => handleEditCard(card.id)}>✏️</button>
                    <button className="delete-btn" onClick={() => { setModalType("delete"); setDeleteCardId(card.id); }}>🗑️</button>
                </div>
            </div>
        ))}
    </div>

    {/* Add / Edit Card Modal 
    {(modalType === "add" || modalType === "edit") && (
        <div className="modal-overlay">
            <div className="modal">
                <h3>{modalType === "add" ? "Add New Card" : "Edit Card"}</h3>
                <input
                    type="text"
                    placeholder="Bank Name"
                    value={newCard.bank}
                    onChange={(e) => setNewCard({ ...newCard, bank: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Card Number (16 Digits)"
                    maxLength={16}
                    value={newCard.cardNumber}
                    onChange={(e) => setNewCard({ ...newCard, cardNumber: e.target.value.replace(/\D/g, "") })}
                />
                <input
                    type="text"
                    placeholder="Expiry (MM/YY)"
                    value={newCard.expiry}
                    onChange={(e) => setNewCard({ ...newCard, expiry: e.target.value })}
                />
                <div className="modal-actions">
                    {modalType === "edit" ? (
                        <button className="save-btn" onClick={handleSaveEdit}>Save Changes</button>
                    ) : (
                        <button className="add-btn" onClick={handleAddCard}>Add Card</button>
                    )}
                    <button className="cancel-btn" onClick={() => setModalType(null)}>Cancel</button>
                </div>
            </div>
        </div>
    )}

    {/* Delete Confirmation Modal 
    {modalType === "delete" && (
        <div className="modal-overlay">
            <div className="modal">
                <p>Are you sure you want to delete this card?</p>
                <div className="modal-actions">
                    <button className="delete-confirm-btn" onClick={handleDeleteCard}>Yes, Delete</button>
                    <button className="cancel-btn" onClick={() => setModalType(null)}>Cancel</button>
                </div>
            </div>
        </div>
    )}
</div>
);
};

export default SavedCards; */
