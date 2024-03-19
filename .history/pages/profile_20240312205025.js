/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useAuth } from '../utils/context/authContext';
import { getUser } from '../api/user';

export default function Profile() {
  const [userDetails, setUserDetails] = useState({});
  const router = useRouter();
  const { user } = useAuth({});
  const { id } = router.query;

  const getAllUsers = () => {
    getUser(user.uid).then(setUserDetails);
  };

  const handleClick = () => {
    router.push('/user/new');
  };

  useEffect(() => {
    getAllUsers(user.uid);
  }, [id, user.uid]);

  return (
    <>
      <div>
        <Button variant="info" className="action-button" onClick={handleClick}>
          VIEW
        </Button>
      </div>
      <>
        <div />
        <div> <img src={user?.photoURL} className="proPic" alt="user" style={{ width: '75px' }} />
        </div>
        {userDetails.length > 0 && (
        <>
          <p>{userDetails[0].blurb}</p>
          <p>{userDetails[0].gamertag}</p>
        </>
        )}

      </>
    </>
  );
}
