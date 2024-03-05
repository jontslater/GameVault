/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import viewGameDetails from '../../api/mergedData';

export default function ViewBook() {
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
        {gameDetails.gameTitle}
        <p>{gameDetails.description || ''}</p>
      </div>
      <div className="text-white ms-5 details">
        <h5>
          {gameDetails.gameObject?.console}
          {gameDetails?.favorite ? ' 🤍' : ''}
        </h5>

        <hr />
      </div>
    </div>
  );
}
