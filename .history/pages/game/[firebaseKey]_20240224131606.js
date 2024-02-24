/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Button } from 'react-bootstrap';
import viewGameDetails from '../../api/mergedData';

export default function ViewGame() {
  const [gameDetails, setGameDetails] = useState({});
  const router = useRouter();

  const { firebaseKey } = router.query;

  useEffect(() => {
    viewGameDetails(firebaseKey).then(setGameDetails);
  }, [firebaseKey]);

  return (
    <div className="mt-5 d-flex flex-wrap">
      <div className="d-flex flex-column">
        <img src={gameDetails.coverPhoto} alt={gameDetails.gameTitle} style={{ width: '300px' }} />
        {gameDetails?.favorite ? ' 🤍' : ''}
        {gameDetails.gameTitle}
        <Button variant="primary" href={gameDetails.youTubeVideo} target="_blank" rel="noopener noreferrer">
          YouTube Video
        </Button>
        <p>{gameDetails.description || ''}</p>
      </div>
      <div className="text-white ms-5 details">
        <h5>
          {gameDetails.platform?.console}

        </h5>
        <hr />
      </div>
    </div>
  );
}
