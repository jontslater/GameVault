/* eslint-disable react/no-array-index-key */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import firebase from 'firebase/app';
import 'firebase/database';

const StarRating = ({ firebaseKey }) => {
  const [rating, setRating] = useState(null);

  const handleRatingChange = (stars) => {
    firebase.database().ref(`games/${firebaseKey}`).update({
      rating: stars,
    });
    setRating(stars); // Update rating in real time
  };

  return (
    <div>
      <div>
        {[...Array(5)].map((_, stars) => (
          <label key={stars}>
            <input
              type="radio"
              name="rating"
              id={`starID-${stars}`}
              value={stars + 1}
              checked={rating === stars + 1}
              onChange={() => handleRatingChange(stars + 1)}
            />
            <div className="stars" style={{ color: stars < rating ? '#ffc107' : '#e4e5e9' }}>⭐️</div>
          </label>
        ))}
      </div>
      <div>
        Current Rating: {rating}
      </div>
    </div>
  );
};

StarRating.propTypes = {
  firebaseKey: PropTypes.string.isRequired,
};

export default StarRating;
