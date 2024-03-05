/* eslint-disable @next/next/no-img-element */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react';
import { Button, Card } from 'react-bootstrap';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faYoutube } from '@fortawesome/free-brands-svg-icons';
import viewGameDetails from '../../api/mergedData';
import StarRating from '../../components/StarRating';

export default function ViewGame() {
  const [gameDetails, setGameDetails] = useState({});
  const [platform, setPlatform] = useState({});

  const router = useRouter();
  const { firebaseKey } = router.query;

  useEffect(() => {
    viewGameDetails(firebaseKey).then((data) => {
      setGameDetails(data.game);
      setPlatform(data.platform);
    });
  }, [firebaseKey]);

  return (
    <div className="text-center my-4">
      <div className="d-flex flex-wrap justify-content-center">
        <Card className="game-card" style={{ backgroundColor: 'black', color: 'white' }}>
          <div className="card-image">
            <img src={gameDetails.coverPhoto} alt={gameDetails.gameTitle} />
          </div>
          <div className="card-details">
            <h5>{gameDetails.gameTitle}</h5>
            <StarRating firebaseKey={firebaseKey} />
            <p>{gameDetails.description || ''}</p>
            <h5>{platform?.console}</h5>
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
            <Link href={`/game/edit/${firebaseKey}`} passHref>
              <Button
                variant="warning"
                style={{
                  backgroundColor: 'yellow', color: 'black', border: '1px solid black', width: '100%',
                }}
              >
                EDIT
              </Button>
            </Link>
          </div>
        </Card>
      </div>
    </div>
  );
}
