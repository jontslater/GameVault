/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { Button, Card } from 'react-bootstrap';
import { useAuth } from '../utils/context/authContext';
import { getUser } from '../api/user';

export default function Profile() {
  const [userDetails, setUserDetails] = useState({});
  const [userAdded, setUserAdded] = useState(false); // State to track if user has been added
  const router = useRouter();
  const { user } = useAuth({});
  const { id } = router.query;

  const getAllUsers = () => {
    getUser(user?.uid).then(setUserDetails);
  };

  useEffect(() => {
    getAllUsers();
  }, [id, user?.uid]);

  const handleAddUserClick = () => {
    router.push('/user/new');
  };

  const handleEditUserClick = () => {
    router.push(`/user/edit/${userDetails?.[0]?.firebaseKey}`);
  };

  // Set userAdded to true when userDetails is not empty
  useEffect(() => {
    if (Object.keys(userDetails).length > 0) {
      setUserAdded(true);
    }
  }, [userDetails]);

  return (
    <Card style={{ width: '30rem' }}>
      <Card.Body>
        {/* Only render Add User button if userAdded is false */}
        {!userAdded && (
          <Button
            variant="info"
            className="action-button"
            onClick={handleAddUserClick}
          >
            Add User
          </Button>
        )}
        {Object.keys(userDetails).length > 0 && (
          <Button
            variant="warning"
            className="action-button"
            onClick={handleEditUserClick}
          >
            Edit User
          </Button>
        )}
        <div />
        <div>
          <img
            src={user?.photoURL}
            className="proPic"
            alt="user"
            style={{ width: '112.5px', height: '112.5px', borderRadius: '50%' }}
          />
        </div>
        <p>{userDetails?.[0]?.gamertag}</p>
        <p>{userDetails?.[0]?.blurb}</p>
      </Card.Body>
    </Card>
  );
}
