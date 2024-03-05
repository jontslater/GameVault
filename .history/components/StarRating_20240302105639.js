import React from 'react';

const StarRating = () => (
  <div>
    {[...Array(5)].map((_, star) => <span key={star}>⭐️</span>)}
  </div>
);

export default StarRating;
