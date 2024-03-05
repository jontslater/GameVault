/* eslint-disable react/no-array-index-key */
import React from 'react';

const StarRating = () => (
  const[rating, setRating] = useState(null)
  <div>
    {[...Array(5)].map((_, stars) => (
      <label key={stars}>
        <input type="radio" name="rating" id={`starID-${stars}`} value={stars + 1} />
        <div className="stars">⭐️</div>
      </label>
    ))}
  </div>
);

export default StarRating;
