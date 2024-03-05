/* eslint-disable @next/next/no-img-element */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Button, Card } from 'react-bootstrap';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faYoutube } from '@fortawesome/free-brands-svg-icons';
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
    <Card style={{
      width: '18rem', margin: '10px', backgroundColor: 'black', color: 'white',
    }}
    >
      <Card.Body className="d-flex flex-column align-items-center">
        <img src={gameDetails.coverPhoto} alt={gameDetails.gameTitle} style={{ width: '300px' }} />
        {gameDetails?.favorite && <span>🤍Favorite<br /></span>}
        {gameDetails?.played && <span>✔️Played<br /></span>}
        <h5>{gameDetails.gameTitle}</h5>
        <StarRating firebaseKey={firebaseKey} />
        <p>{gameDetails.description || ''}</p>
        <h5>{gameDetails.platform?.console}</h5>
        <Button
          variant="primary"
          style={{
            backgroundColor: 'black', color: 'white', border: '1px solid white', width: '100%', marginBottom: '10px',
          }}
          href={gameDetails.youTubeVideo}
          target="_blank"
          rel="noopener noreferrer"
        >
          <FontAwesomeIcon icon={faYoutube} style={{ marginRight: '5px' }} /> YouTube Video
        </Button>
        <Link href={`/game/edit/${gameDetails.firebaseKey}`} passHref>
          <Button
            variant="warning"
            style={{
              backgroundColor: 'yellow', color: 'black', border: '1px solid black', width: '100%',
            }}
          >EDIT
          </Button>
        </Link>
      </Card.Body>
    </Card>
  );
}
