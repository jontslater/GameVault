import React, { useEffect, useState } from 'react';
import { Button, Card } from 'react-bootstrap';
import Link from 'next/link';
import { useAuth } from '../utils/context/authContext';
import { getGame } from '../api/games';
import StarRating from '../components/StarRating'; // Assuming you have a StarRating component
import viewGameDetails from '../api/mergedData';

function Suggested() {
  const { user } = useAuth();
  const [games, setGames] = useState([]);
  const [platforms, setPlatforms] = useState([]);
  const [random, setRandom] = useState(null);

  const getRandomGame = () => {
    const filteredGames = games.filter((game) => game.firebaseKey !== (random?.firebaseKey || ''));
    return filteredGames[Math.floor(Math.random() * filteredGames.length)];
  };

  const getAllTheGames = async () => {
    try {
      const gamesData = await getGame(user.uid);
      setGames(gamesData);

      const platformsData = await viewGameDetails(user.uid);
      setPlatforms(platformsData);

      const randomGame = getRandomGame();
      setRandom(randomGame);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleSuggestGame = () => {
    const newRandomGame = getRandomGame();
    setRandom(newRandomGame);
  };

  useEffect(() => {
    getAllTheGames();
  }, [user.uid]);

  return (
    <div style={{
      display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh',
    }}
    >
      <div>
        <Link href="/game/new" passHref>
          <Button>Add Game</Button>
        </Link>
        <Link href="/suggestedGame" passHref>
          <Button>Suggest Game</Button>
        </Link>
        {random && (
          <Card
            className="card"
            style={{
              width: '60rem', margin: '10px', display: 'flex', flexDirection: 'row',
            }}
          >
            <img src={random.coverPhoto} alt={random.gameTitle} style={{ width: '300px', height: '100%', objectFit: 'cover' }} />
            <div style={{ display: 'flex', flexDirection: 'column', marginLeft: '20px' }}>
              <h5 className="card-title">{random.gameTitle}</h5>
              <StarRating firebaseKey={random.firebaseKey} />
              <p className="card-text">{random.description || ''}</p>
              <h5 className="card-title">{platforms.find((p) => p.firebaseKey === random.gamePlatform)?.console}</h5>
              {random.favorite && <span>🤍Favorite<br /></span>}
              {random.played && <span>✔️Played<br /></span>}
              <Button
                variant="primary"
                style={{
                  backgroundColor: 'black', color: 'white', border: '1px solid black', marginBottom: '10px',
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
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}

export default Suggested;
