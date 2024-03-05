/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Button } from 'react-bootstrap';
import Link from 'next/link';
import viewGameDetails from '../../api/mergedData';
// import StarRating from '../../components/StarRating';

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
        {gameDetails?.played ? '✔️' : ''}
        {gameDetails.gameTitle}
        {/* <StarRating /> */}
        <p>{gameDetails.description || ''}</p>
      </div>
      <div className="text-black ms-5 details">
        <h5>
          {gameDetails.platform?.console}
        </h5>

        <Button variant="primary" href={gameDetails.youTubeVideo} target="_blank" rel="noopener noreferrer">
          YouTube Video
        </Button>
        <br />
        <Link href={`/game/edit/${gameDetails.firebaseKey}`} passHref>
          <Button variant="info">EDIT</Button>
        </Link>
      </div>
    </div>
  );
}
