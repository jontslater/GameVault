/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import viewGameDetails from '../../api/mergedData';

export default function ViewBook() {
  const [gameDetails, setGameDetails] = useState({});
  const router = useRouter();

  // TODO: grab firebaseKey from url
  const { firebaseKey } = router.query;

  // TODO: make call to API layer to get the data
  useEffect(() => {
    viewGameDetails(firebaseKey).then(setGameDetails);
  }, [firebaseKey]);

  return (
    <div className="mt-5 d-flex flex-wrap">
      <div className="d-flex flex-column">
        <img src={gameDetails.image} alt={gameDetails.title} style={{ width: '300px' }} />
      </div>
      <div className="text-white ms-5 details">
        <h5>
          {gameDetails.title} by {gameDetails.authorObject?.first_name} {gameDetails.authorObject?.last_name}
          {gameDetailsauthorObject?.favorite ? ' 🤍' : ''}
        </h5>
        <p>{gameDetails.description || ''}</p>
        <hr />
        <p>
          {gameDetails.sale}
        </p>
      </div>
    </div>
  );
}
