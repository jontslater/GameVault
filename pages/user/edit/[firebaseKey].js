/* eslint-disable import/no-unresolved */
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import UserForm from '../../../components/UserForm';
import { getSingleUser } from '../../../api/user';

export default function EditBook() {
  const [editItem, setEditItem] = useState({});
  const router = useRouter();
  const { firebaseKey } = router.query;

  useEffect(() => {
    getSingleUser(firebaseKey).then(setEditItem);
  }, [firebaseKey]);

  // TODO: pass object to form
  return (<UserForm obj={editItem} />);
}
