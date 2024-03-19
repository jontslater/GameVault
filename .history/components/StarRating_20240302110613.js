/* eslint-disable react/no-array-index-key */
import React from 'react';

const StarRating = () => (
  <div>
    {[...Array(5)].map((_, stars) => (
      <label>
        <input type="radio" name="rating" id="starID" />
        <span key={stars}>⭐️</span>
      </label>
    ))}
  </div>
);

export default StarRating;
