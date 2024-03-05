import React from 'react';

const StarRating = () => (
  <div>
    {[...Array(5)].map((_, starIndex) => <span key={starIndex}>⭐️</span>)}
  </div>
);

export default StarRating;
