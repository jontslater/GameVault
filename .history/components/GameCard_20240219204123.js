import PropTypes from 'prop-types';
import { Button, Card } from 'react-bootstrap';
import React from 'react';
// import Link from 'next/link';
import { deleteSingleGame } from '../api/games';

function GameCard({ gameObj, onUpdate }) {
  const deleteThisGame = () => {
    if (window.confirm(`Delete ${gameObj.gameTitle}?`)) {
      deleteSingleGame(gameObj.firebaseKey).then(() => onUpdate());
    }
  };

  return (
    <Card style={{ width: '18rem', margin: '10px' }}>
      <Card.Body>
        <Card.Title>{gameObj.gameTitle}</Card.Title>
        <Card.Title>{gameObj.gamePlatform}</Card.Title>
        <Button variant="danger" onClick={deleteThisGame} className="m-2">
          DELETE
        </Button>
      </Card.Body>
    </Card>
  );
}

GameCard.propTypes = {
  gameObj: PropTypes.shape({
    gameTitle: PropTypes.string,
    youTubeVideo: PropTypes.string,
    gamePlatform: PropTypes.string,
    firebaseKey: PropTypes.string,
    coverPhoto: PropTypes.string,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default GameCard;
