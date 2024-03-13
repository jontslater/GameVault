/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-bootstrap-icons';
import { Button } from 'react-bootstrap';
import { useAuth } from '../utils/context/authContext';
import { getUser } from '../api/user';

export default function Profile() {
  const [userDetails, setUserDetails] = useState([]);
  const router = useRouter();
  const { user } = useAuth({});
  const { id } = router.query;

  const getAllUsers = () => {
    getUser(user.uid).then(setUserDetails);
  };

  useEffect(() => {
    getAllUsers(user.uid);
  }, [id, user.uid]);

  return (
    <>

      <br />

      <div> <img src={user?.photoURL} className="proPic" alt="user" style={{ width: '75px' }} /><Link href="/user/new/" passHref>
        <Button variant="warning" className="action-button">EDIT</Button>
      </Link>
      </div>

    </>
  );
}
