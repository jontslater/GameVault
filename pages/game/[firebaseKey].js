/* eslint-disable @next/next/no-img-element */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Button, Card } from 'react-bootstrap';
import Link from 'next/link';
import viewGameDetails from '../../api/mergedData';
import StarRating from '../../components/StarRating';

export default function ViewGame() {
  const [gameDetails, setGameDetails] = useState({});
  const router = useRouter();

  const { firebaseKey } = router.query;

  useEffect(() => {
    viewGameDetails(firebaseKey).then(setGameDetails);
  }, [firebaseKey]);

  return (
    <div style={{
      display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh',
    }}
    >
      <Card
        className="card"
        style={{
          width: '60rem', margin: '10px', display: 'flex', flexDirection: 'row',
        }}
      >
        <img src={gameDetails.coverPhoto} alt={gameDetails.gameTitle} style={{ width: '300px', height: '100%', objectFit: 'cover' }} />
        <div style={{ display: 'flex', flexDirection: 'column', marginLeft: '20px' }}>
          <h5 className="card-title">{gameDetails.gameTitle}</h5>
          <StarRating firebaseKey={firebaseKey} />
          <p className="card-text">{gameDetails.description || ''}</p>
          <h5 className="card-title">{gameDetails.platform?.console}</h5>
          {gameDetails?.favorite && <span>🤍Favorite<br /></span>}
          {gameDetails?.played && <span>✔️Played<br /></span>}
          <Button
            variant="primary"
            style={{
              backgroundColor: 'black', color: 'white', border: '1px solid black', marginBottom: '10px',
            }}
            href={gameDetails.youTubeVideo}
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fab fa-youtube" style={{ color: 'red' }} /> YouTube Video
          </Button>
          <Link href={`/game/edit/${gameDetails.firebaseKey}`} passHref>
            <Button variant="warning" className="btn action-button">EDIT</Button>
          </Link>
        </div>
      </Card>
    </div>
  );
}
