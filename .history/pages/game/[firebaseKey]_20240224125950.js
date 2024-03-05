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
        <img src={gameDetails.coverPhoto} alt={gameDetails.title} style={{ width: '300px' }} />
      </div>
      <div className="text-white ms-5 details">
        <h5>
          {gameDetails.title} by {gameDetails.authorObject?.first_name} {gameDetails.authorObject?.last_name}
          {gameDetails?.favorite ? ' 🤍' : ''}
        </h5>
        <p>{gameDetails.description || ''}</p>
        <hr />
      </div>
    </div>
  );
}
