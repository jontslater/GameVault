import React from 'react';

const StarRating = () => (
  <div>
    {[...Array(5)].map((_, index) => <span key={index}>⭐️</span>)}
  </div>
);

export default StarRating;
