/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useAuth } from '../utils/context/authContext';
import { getUser } from '../api/user';

export default function Profile() {
  const [userDetails, setUserDetails] = useState([]);
  const router = useRouter();
  const { user } = useAuth({});
  const { id } = router.query;

  const getAllThePosts = () => {
    getUser(user.uid).then(setUserDetails);
    console.warn(user);
  };

  useEffect(() => {
    getAllThePosts(id, user.uid);
  }, [id, user.uid]);

  return (
    <>
      <br />
      <div> <img src={userDetails.providerData.photoURL} className="proPic" alt="user" style={{ width: '75px' }} />
      </div>

    </>
  );
}
