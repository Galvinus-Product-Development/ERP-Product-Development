import { useState } from 'react';
import './Reviews.css';

const Reviews = () => {
    const [reviews, setReviews] = useState([
        { id: 1, product: 'Product 1', rating: 4, date: '10-Mar-2025', review: 'Great product!' },
        { id: 2, product: 'Product 2', rating: 5, date: '08-Mar-2025', review: 'Loved it!' },
        { id: 3, product: 'Product 3', rating: 4, date: '10-Mar-2025', review: 'Great product!' },
        { id: 4, product: 'Product 4', rating: 5, date: '08-Mar-2025', review: 'Loved it!' },
        { id: 5, product: 'Product 5', rating: 4, date: '10-Mar-2025', review: 'Great product!' },
        { id: 6, product: 'Product 6', rating: 5, date: '08-Mar-2025', review: 'Loved it!' },



    ]);
    const [selectedReview, setSelectedReview] = useState(null);
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [editedReview, setEditedReview] = useState("");
    const [editedRating, setEditedRating] = useState(0);

    const openEditModal = (review) => {
        setSelectedReview(review);
        setEditedReview(review.review);
        setEditedRating(review.rating);
        setEditModalOpen(true);
    };

    const openDeleteModal = (review) => {
        setSelectedReview(review);
        setDeleteModalOpen(true);
    };

    const handleDelete = () => {
        setReviews(reviews.filter(r => r.id !== selectedReview.id));
        setDeleteModalOpen(false);
    };

    const handleEditSave = () => {
        setReviews(reviews.map(r => r.id === selectedReview.id ? { ...r, review: editedReview, rating: editedRating } : r));
        setEditModalOpen(false);
    };

    return (
        <div className="reviews-container">
            <h2>My Reviews & Ratings</h2>
            <div className="reviews-list">
                {reviews.map(review => (
                    <div key={review.id} className="review-item">
                        <p><strong>{review.product}</strong></p>
                         {/* Star rating display */}
                        <div className="star-list">
                            {[1, 2, 3, 4, 5].map(star => (
                            <span
                                key={star}
                                className={`star-lists ${star <= review.rating ? 'gold' : ''}`}
                                aria-label={`${star} Star`}
                                role="img"
                            >
                                ★
                            </span>
                            ))}
                        </div>
                        <p>{review.review}</p>
                        <p className="review-date">{review.date}</p>
                        <button onClick={() => openEditModal(review)}>Edit</button>
                        <button onClick={() => openDeleteModal(review)}>Delete</button>
                    </div>
                ))}
            </div>

            {editModalOpen && (
            <div className="modal-review">
                <div className="modal-content">
                <h3>Edit Review</h3>
                <label>Rating:</label>
                <div className="star-rating">
                    {[1, 2, 3, 4, 5].map(star => (
                    <span
                        key={star}
                        className={`star ${star <= editedRating ? 'gold' : ''}`}
                        onClick={() => setEditedRating(star)}
                        onKeyDown={(e) => { if (e.key === 'Enter') setEditedRating(star); }}
                        role="button"
                        tabIndex={0}
                        aria-label={`${star} Star`}
                    >
                        ★
                    </span>
                    ))}
                </div>

                {/* Move these inside the same modal-content div */}
                <label>Review:</label>
                <textarea value={editedReview} onChange={(e) => setEditedReview(e.target.value)}></textarea>
                <div className="modal-buttons">
                    <button onClick={handleEditSave}>Save</button>
                    <button onClick={() => setEditModalOpen(false)}>Cancel</button>
                </div>
                </div>
            </div>
            )}


{deleteModalOpen && (
                <div className="modal-review">
                    <div className="modal-content">
                        <h3>Are you sure you want to delete this review?</h3>
                        <div className="modal-buttons">
                        <button onClick={handleDelete}>Yes, Delete</button>
                        <button onClick={() => setDeleteModalOpen(false)}>Cancel</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Reviews;
