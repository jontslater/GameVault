/* eslint-disable import/no-unresolved */
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import GameForm from '../../../components/gameForm';
import { getSingleGame } from '../../../api/games';

export default function EditBook() {
  const [editItem, setEditItem] = useState({});
  const router = useRouter();
  const { firebaseKey } = router.query;

  useEffect(() => {
    getSingleGame(firebaseKey).then(setEditItem);
  }, [firebaseKey]);

  // TODO: pass object to form
  return (<GameForm obj={editItem} />);
}
