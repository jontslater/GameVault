/* eslint-disable react/no-array-index-key */
import React from 'react';

const StarRating = () => (
  <div>
    {[...Array(5)].map((_, stars) => (
      const ratingVale = i + 1;
      <label key={stars}>
        <input type="radio" name="rating" id={`starID-${stars}`} value={ratingValue} />
        <div className="stars">⭐️</div>
      </label>
    ))}
  </div>
);

export default StarRating;
