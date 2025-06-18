import PropTypes from 'prop-types';
import { useState } from 'react';
import './StarRating.css';

const StarRating = ({ rating, onRatingChange, readonly = false }) => {
  const [hoverRating, setHoverRating] = useState(0);

  const handleClick = (newRating) => {
    if (!readonly && onRatingChange) {
      onRatingChange(newRating);
    }
  };

  return (
    <div className="star-rating">
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          className={`star ${(hoverRating || rating) >= star ? 'filled' : ''}`}
          onClick={() => handleClick(star)}
          onMouseEnter={() => !readonly && setHoverRating(star)}
          onMouseLeave={() => !readonly && setHoverRating(0)}
        >
          ★
        </span>
      ))}
    </div>
  );
};

StarRating.propTypes = {
  rating: PropTypes.number.isRequired,
  onRatingChange: PropTypes.func,
  readonly: PropTypes.bool
};

export default StarRating;