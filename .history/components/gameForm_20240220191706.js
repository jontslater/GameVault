import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import { useAuth } from '../utils/context/authContext';
import { createGame, updateGame } from '../api/games';
import { getPlatforms } from '../api/platforms';

const initialState = {
  description: '',
  coverPhoto: '',
  favorite: false,
  gamePlatform: '',
  gameTitle: '',
  youTubeVideo: '',
};

function GameForm({ obj }) {
  const [formInput, setFormInput] = useState(initialState);
  const [platforms, setPlatform] = useState([]);
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    getPlatforms(user.uid).then(setPlatform);

    if (obj.firebaseKey) setFormInput(obj);
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
    if (obj.firebaseKey) {
      updateGame(formInput).then(() => router.push(`/game/${obj.firebaseKey}`));
    } else {
      const payload = { ...formInput, uid: user.uid };
      createGame(payload).then(({ name }) => {
        const patchPayload = { firebaseKey: name };
        updateGame(patchPayload).then(() => {
          router.push('/');
        });
      });
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h2 className="text-white mt-5">{obj.firebaseKey ? 'Update' : 'Create'} Book</h2>

      {/* TITLE INPUT  */}
      <FloatingLabel controlId="floatingInput1" label="Game Title" className="mb-3">
        <Form.Control
          type="text"
          placeholder="Enter Game Title"
          name="gameTitle"
          value={formInput.gameTitle}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      {/* IMAGE INPUT  */}
      <FloatingLabel controlId="floatingInput2" label="Cover Image" className="mb-3">
        <Form.Control
          type="url"
          placeholder="Enter an image url"
          name="coverPhoto"
          value={formInput.coverPhoto}
          onChange={handleChange}
          required
        />
      </FloatingLabel>
      <FloatingLabel controlId="floatingInput2" label="YouTube Link" className="mb-3">
        <Form.Control
          type="url"
          placeholder="Enter an video url"
          name="youTubeVideo"
          value={formInput.youTubeVideo}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      {/* PRICE INPUT  */}
      <FloatingLabel controlId="floatingInput3" label="Game Description" className="mb-3">
        <Form.Control
          type="text"
          placeholder="Enter Description"
          name="description"
          value={formInput.description}
          onChange={handleChange}
          required
        />
      </FloatingLabel>
      <FloatingLabel controlId="floatingSelect" label="Platform">
        <Form.Select
          aria-label="Platform"
          name="gamePlatform"
          onChange={handleChange}
          className="mb-3"
          value={formInput.gamePlatform}
        >
          <option value="">Select a Platform</option>
          {
            platforms.map((platform) => (
              <option
                key={platform.Firebasekey}
                value={platform.Firebasekey}
              >
                {platform.console}
              </option>
            ))
          }
        </Form.Select>
      </FloatingLabel>

      {/* DESCRIPTION TEXTAREA
      <FloatingLabel controlId="floatingTextarea" label="Description" className="mb-3">
        <Form.Control
          as="textarea"
          placeholder="Description"
          style={{ height: '100px' }}
          name="description"
          value={formInput.description}
          onChange={handleChange}
          required
        />
      </FloatingLabel> */}

      {/* A WAY TO HANDLE UPDATES FOR TOGGLES, RADIOS, ETC  */}
      <Form.Check
        className="text-white mb-3"
        type="switch"
        id="favorite"
        name="favorite"
        label="Favorite?"
        checked={formInput.sale}
        onChange={(e) => {
          setFormInput((prevState) => ({
            ...prevState,
            sale: e.target.checked,
          }));
        }}
      />

      {/* SUBMIT BUTTON  */}
      <Button type="submit">{obj.firebaseKey ? 'Update' : 'Create'} Book</Button>
    </Form>
  );
}

GameForm.propTypes = {
  obj: PropTypes.shape({
    description: PropTypes.string,
    image: PropTypes.string,
    price: PropTypes.string,
    sale: PropTypes.bool,
    title: PropTypes.string,
    author_id: PropTypes.string,
    firebaseKey: PropTypes.string,
  }),
};

GameForm.defaultProps = {
  obj: initialState,
};

export default GameForm;
