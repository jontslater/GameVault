/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { Button, Card } from 'react-bootstrap';
import Link from 'next/link';
import { useAuth } from '../utils/context/authContext';
import { getGame } from '../api/games';
import viewGameDetails from '../api/mergedData';
import StarRating from '../components/StarRating';

function Suggested() {
  const { user } = useAuth();
  const [games, setGames] = useState([]);
  const [platforms, setPlatforms] = useState([]);
  const random = games[Math.floor(Math.random() * games.length)];

  const getAllTheGames = async () => {
    try {
      const gamesData = await getGame(user.uid);
      setGames(gamesData);

      const platformsData = await viewGameDetails(user.uid);
      setPlatforms(platformsData);
    } catch (error) {
      // console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    getAllTheGames();
  }, [user.uid]);

  return (
    <div className="text-center my-4">
      <Link href="/suggestedGame" passHref>
        <Button>Suggest Game</Button>
      </Link>
      <div className="d-flex flex-wrap">
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
