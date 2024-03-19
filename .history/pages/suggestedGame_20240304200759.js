import React, { useEffect, useState } from 'react';
import { Button, Card } from 'react-bootstrap';
import Link from 'next/link';
import { useAuth } from '../utils/context/authContext';
import { getGame } from '../api/games';
import viewGameDetails from '../api/mergedData';

function Suggested() {
  const { user } = useAuth();
  const [games, setGames] = useState([]);
  const [platforms, setPlatforms] = useState([]);
  const [random, setRandom] = useState(null);

  const getAllTheGames = async () => {
    try {
      const gamesData = await getGame(user.uid);
      setGames(gamesData);

      const platformsData = await viewGameDetails(user.uid);
      setPlatforms(platformsData);

      const randomGame = gamesData[Math.floor(Math.random() * gamesData.length)];
      setRandom(randomGame);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    getAllTheGames();
  }, [user.uid]);

  const handleSuggestGame = () => {
    const randomGame = games[Math.floor(Math.random() * games.length)];
    setRandom(randomGame);
  };

  return (
    <div className="text-center my-4">
      <div className="d-flex justify-content-between align-items-center">
        <h2>Suggested Game</h2>
        <Link href="/" passHref>
          <Button variant="secondary">Back</Button>
        </Link>
      </div>
      <Button onClick={handleSuggestGame}>Suggest Another Game</Button>
      {random && (
        <Card className="card" style={{ width: '18rem', margin: '10px' }}>
          <Card.Body className="card-body">
            <h5 className="card-title">{random.gameTitle}</h5>
            <img src={random.coverPhoto} alt={random.gameTitle} style={{ width: '300px' }} />
            <p className="card-text">{random.description || ''}</p>
            <h5 className="card-title">{platforms.find((p) => p.firebaseKey === random.gamePlatform)?.console}</h5>
            {random.favorite && <span>🤍Favorite<br /></span>}
            {random.played && <span>✔️Played<br /></span>}
            <Button
              variant="primary"
              style={{
                backgroundColor: 'black', color: 'white', border: '1px solid black', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '10px',
              }}
              href={random.youTubeVideo}
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fab fa-youtube" style={{ color: 'red' }} /> YouTube Video
            </Button>
            <Link href={`/game/edit/${random.firebaseKey}`} passHref>
              <Button variant="warning" className="btn action-button">EDIT</Button>
            </Link>
          </Card.Body>
        </Card>
      )}
    </div>
  );
}

export default Suggested;
