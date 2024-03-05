import React from 'react';

const StarRating = () => (
  <div>
    {[...Array(5)].map((_, star) => <span>⭐️</span>)}
  </div>
);

export default StarRating;
