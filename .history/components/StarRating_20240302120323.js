/* eslint-disable react/no-array-index-key */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import firebase from 'firebase/app';
import 'firebase/database';

const StarRating = ({ firebaseKey }) => {
  const [rating, setRating] = useState(null);
  const [gameDetails, setGameDetails] = useState(null);

  useEffect(() => {
    const fetchGameDetails = async () => {
      const snapshot = await firebase.database().ref(`games/${firebaseKey}`).once('value');
      setGameDetails(snapshot.val());
    };

    fetchGameDetails();
  }, [firebaseKey]);

  const handleRatingChange = async (stars) => {
    await firebase.database().ref(`games/${firebaseKey}`).update({
      rating: stars,
    });
    setRating(stars);
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
        Current Rating{rating && <p>{JSON.stringify(gameDetails.rating)}</p>}
      </div>
      {/* Previous Rating{gameDetails && <p>{JSON.stringify(gameDetails.rating)}</p>} */}
    </div>
  );
};

StarRating.propTypes = {
  firebaseKey: PropTypes.string.isRequired,
};

export default StarRating;
