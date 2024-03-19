import { useEffect, useState } from 'react';
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
      {rating && <p>Rating: {rating}</p>}
      {gameDetails && <p>Game Details: {JSON.stringify(gameDetails)}</p>}
    </div>
  );
};

export default StarRating;
