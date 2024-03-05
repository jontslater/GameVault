/* eslint-disable react/no-array-index-key */
import React, { useState } from 'react';

const StarRating = () => {
  const [rating, setRating] = useState(null);

  return (
    <div>
      {[...Array(5)].map((_, stars) => (
        <label key={stars}>
          <input
            type="radio"
            name="rating"
            id={`starID-${stars}`}
            value={stars + 1}
            checked={rating === stars + 1}
            onClick={() => setRating(stars + 1)}
          />
          <div className="stars" style={{ color: stars < rating ? '#ffc107' : '#e4e5e9' }}>⭐️</div>
        </label>
      ))}
    </div>
  );
};

export default StarRating;
