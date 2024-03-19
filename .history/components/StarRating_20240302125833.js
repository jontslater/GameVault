/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/no-array-index-key */
// components/StarRating.js
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import firebase from 'firebase/app';
import 'firebase/database';

const StarRating = ({ firebaseKey }) => {
  const [rating, setRating] = useState(null);

  useEffect(() => {
    const fetchRating = async () => {
      const snapshot = await firebase.database().ref(`game/${firebaseKey}/rating`).once('value');
      const initialRating = snapshot.val();
      setRating(initialRating);
    };

    fetchRating();
  }, [firebaseKey]);

  const handleRatingChange = (stars) => {
    firebase.database().ref(`game/${firebaseKey}`).update({
      rating: stars,
    }).then(() => {
      setRating(stars);
    })
      .catch((error) => {
        console.error('Error updating rating:', error);
      });
  };

  return (
    <div>
      <div>
        {[...Array(5)].map((_, index) => (
          <label key={index} htmlFor={`starID-${index}`}>
            <input
              type="radio"
              name="rating"
              id={`starID-${index}`}
              value={index + 1}
              checked={rating === index + 1}
              onChange={() => handleRatingChange(index + 1)}
              className="star-input"
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="stars"
              viewBox="0 0 16 16"
            >
              <path
                d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.56.56 0 0 0-.163-.505L1.71 6.745l4.052-.576a.53.53 0 0 0 .393-.288L8 2.223l1.847 3.658a.53.53 0 0 0 .393.288l4.052.575-2.906 2.77a.56.56 0 0 0-.163.506l.694 3.957-3.686-1.894a.5.5 0 0 0-.461 0z"
                style={{ fill: index < rating ? '#ffc107' : '#e4e5e9' }}
              />
            </svg>
          </label>
        ))}
      </div>
      Rating{rating}
    </div>
  );
};

StarRating.propTypes = {
  firebaseKey: PropTypes.string.isRequired,
};

export default StarRating;
