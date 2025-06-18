import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import StarRating from "./StarRating";
import "./Tab.css";

const Tabs = ({ activeTab, setActiveTab, productId, product }) => {
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState({
    rating: 0,
    comment: "",
    name: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [openTab, setOpenTab] = useState(true);
  const [showReviewForm, setShowReviewForm] = useState(false); // ✅ New state

  // Fetch reviews when tab mounts or product changes
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const mockReviews = [
          {
            id: "1",
            name: "Alex Johnson",
            rating: 5,
            comment: "Excellent product quality and fast shipping!",
            date: new Date().toISOString(),
          },
          {
            id: "2",
            name: "Sam Wilson",
            rating: 4,
            comment: "Good value for money, but packaging could be better",
            date: new Date(Date.now() - 86400000).toISOString(),
          },
        ];
        setReviews(mockReviews);
      } catch (error) {
        console.error("Failed to fetch reviews:", error);
      }
    };

    if (activeTab === "reviews") fetchReviews();
  }, [activeTab, productId]);

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      setTimeout(() => {
        const submittedReview = {
          id: Math.random().toString(36).substring(2, 9),
          ...newReview,
          date: new Date().toISOString(),
        };

        setReviews([submittedReview, ...reviews]);
        setNewReview({ rating: 0, comment: "", name: "" });
        setIsSubmitting(false);
        setShowReviewForm(false); // ✅ Hide form after submission
      }, 1000);
    } catch (error) {
      console.error("Failed to submit review:", error);
      setIsSubmitting(false);
    }
  };

  const averageRating =
    reviews.length > 0
      ? (
          reviews.reduce((sum, review) => sum + review.rating, 0) /
          reviews.length
        ).toFixed(1)
      : 0;

  const tabs = [
    {
      id: "reviews",
      label: `Reviews (${reviews.length})`,
      content: (
        <div className="reviews-tab">
          <div className="rating-summary">
            <h3>Average Rating: {averageRating} ★</h3>
            <div className="rating-distribution">
              {[5, 4, 3, 2, 1].map((stars) => {
                const count = reviews.filter(
                  (r) => Math.floor(r.rating) === stars
                ).length;
                return (
                  <div key={stars} className="rating-bar">
                    <span>{stars} ★</span>
                    <progress value={count} max={reviews.length || 1} />
                    <span>({count})</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* ✅ Toggle Review Form */}
          <form onSubmit={handleSubmitReview} className="review-form">
            {!showReviewForm ? (
              <button
                type="button"
                className="show-review-form-btn"
                onClick={() => setShowReviewForm(true)}
              >
                Add a Review
              </button>
            ) : (
              <>
                <h3>Add Your Review</h3>
                <div className="form-group">
                  <label>Your Rating:</label>
                  <StarRating
                    rating={newReview.rating}
                    onRatingChange={(rating) =>
                      setNewReview({ ...newReview, rating })
                    }
                  />
                </div>
                <div className="form-group">
                  <label>Your Name:</label>
                  <input
                    type="text"
                    value={newReview.name}
                    onChange={(e) =>
                      setNewReview({ ...newReview, name: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Your Review:</label>
                  <textarea
                    value={newReview.comment}
                    onChange={(e) =>
                      setNewReview({ ...newReview, comment: e.target.value })
                    }
                    required
                  />
                </div>
                <button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Submitting..." : "Submit Review"}
                </button>
              </>
            )}
          </form>

          <div className="reviews-list">
            {reviews.length === 0 ? (
              <p>No reviews yet. Be the first to review!</p>
            ) : (
              reviews.map((review) => (
                <div key={review.id} className="review-card">
                  <div className="review-header">
                    <span className="reviewer">{review.name}</span>
                    <span className="review-date">
                      {new Date(review.date).toLocaleDateString()}
                    </span>
                    <StarRating rating={review.rating} readonly />
                  </div>
                  <p className="review-comment">{review.comment}</p>
                </div>
              ))
            )}
          </div>
        </div>
      ),
    },
  ];

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 1024) {
        setActiveTab("description");
        setOpenTab(null);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [setActiveTab]);

  const handleToggle = (id) => {
    setOpenTab((prevOpen) => {
      const isCurrentlyOpen = prevOpen === id;
      if (isCurrentlyOpen) {
        setActiveTab("");
        return null;
      } else {
        setActiveTab(id);
        return id;
      }
    });
  };

  return (
    <div className="tabs">
      <ul className="tab-list">
        {tabs.map((tab) => (
          <li
            key={tab.id}
            className={`tab-item ${activeTab === tab.id ? "active" : ""}`}
            role="tab"
            aria-selected={activeTab === tab.id}
            onClick={() => {
              if (window.innerWidth <= 1024) {
                handleToggle(tab.id);
              } else {
                setActiveTab(tab.id);
              }
            }}
          >
            <div className="tab-header">
              <span>{tab.label}</span>
              {window.innerWidth <= 1024 && (
                <span
                  className={`arrow ${openTab === tab.id ? "up" : "down"}`}
                />
              )}
            </div>
          </li>
        ))}
      </ul>

      <div className="tab-content-container">
        {tabs.map((tab) =>
          (window.innerWidth > 1024 && activeTab === tab.id) ||
          (window.innerWidth <= 1024 && openTab === tab.id) ? (
            <div key={tab.id} className="tab-content">
              {tab.content}
            </div>
          ) : null
        )}
      </div>
    </div>
  );
};

Tabs.propTypes = {
  activeTab: PropTypes.string.isRequired,
  setActiveTab: PropTypes.func.isRequired,
  productId: PropTypes.string.isRequired,
  product: PropTypes.shape({
    product_description: PropTypes.string,
    Brand: PropTypes.shape({
      brand_name: PropTypes.string,
    }),
    ProductCategory: PropTypes.shape({
      category_name: PropTypes.string,
    }),
    weight: PropTypes.number,
    dimensions: PropTypes.string,
  }).isRequired,
};

export default Tabs;
