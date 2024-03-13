import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import { useAuth } from '../utils/context/authContext';
import { createUser, updateUser } from '../api/user';

const initialState = {
  blurb: '',
  gamertag: '',
};

function UserForm({ obj }) {
  const [formInput, setFormInput] = useState(initialState);
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    if (user && obj.firebaseKey) {
      setFormInput(obj);
    }
  }, [obj, user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!user || !user.uid) {
      // Exit early if user is null or does not have a UID
      console.error('User data not available');
      return;
    }

    const payload = { ...formInput, uid: user.uid };

    if (obj.firebaseKey) {
      updateUser(payload).then(() => router.push('/profile'));
    } else {
      createUser(payload).then(({ name }) => {
        const patchPayload = { firebaseKey: name };
        updateUser(patchPayload).then(() => {
          router.push('/profile');
        });
      });
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h2 className="text-white mt-5">{obj.displayName ? 'Update' : 'Create'} Profile</h2>

      {/* GAMER TAG INPUT  */}
      <FloatingLabel controlId="floatingInput1" label="Gamer Tag" className="mb-3">
        <Form.Control
          type="text"
          placeholder="Enter Gamer Tag"
          name="gamertag"
          value={formInput.gamertag}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      {/* BIO INPUT  */}
      <FloatingLabel controlId="floatingInput2" label="Bio" className="mb-3">
        <Form.Control
          type="text"
          placeholder="Enter Gamer Bio"
          name="blurb"
          value={formInput.blurb}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      <Button type="submit">{obj.displayName ? 'Update' : 'Create'} Profile </Button>
    </Form>
  );
}

UserForm.propTypes = {
  obj: PropTypes.shape({
    blurb: PropTypes.string,
    gamertag: PropTypes.string,
    uid: PropTypes.string,
    displayName: PropTypes.string,
    firebaseKey: PropTypes.string,
  }),
};

UserForm.defaultProps = {
  obj: initialState,
};

export default UserForm;
