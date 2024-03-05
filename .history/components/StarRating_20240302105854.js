import React from 'react';

const StarRating = () => (
  <div>
    {[...Array(5)].map((_, stars) => <span key={stars}>⭐️</span>)}
  </div>
);

export default StarRating;
