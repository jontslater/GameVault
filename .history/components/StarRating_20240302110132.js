/* eslint-disable react/no-array-index-key */
import React from 'react';

const StarRating = () => (
  <div>
    {[...Array(5)].map((_, stars) => <span key={stars}><label>⭐️</label></span>)}
  </div>
);

export default StarRating;
