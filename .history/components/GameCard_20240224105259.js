import PropTypes from 'prop-types';
import { Button, Card } from 'react-bootstrap';
import React from 'react';
import Link from 'next/link';
import { deleteSingleGame } from '../api/games';

function GameCard({ gameObj, onUpdate, platform }) {
  const deleteThisGame = () => {
    if (window.confirm(`Delete ${gameObj.gameTitle}?`)) {
      deleteSingleGame(gameObj.firebaseKey).then(() => onUpdate());
    }
  };

  return (
    <Card style={{ width: '18rem', margin: '10px' }}>
      <Card.Body>
        <Card.Img variant="top" src={gameObj.coverPhoto} alt={gameObj.gameTitle} style={{ height: '400px' }} />
        <Card.Title>{gameObj.gameTitle}</Card.Title>
        <p>{platform.console}</p>
        <p className="card-text bold">{gameObj.favorite && <span>Favorite<br /></span> }</p>
        <Button variant="primary" href={gameObj.youTubeVideo} target="_blank" rel="noopener noreferrer">
          YouTube Video
        </Button>
        <Link href={`/game/${gameObj.firebaseKey}`} passHref>
          <Button variant="primary" className="m-2">VIEW</Button>
        </Link>
        <Button variant="danger" onClick={deleteThisGame} className="m-2">
          DELETE
        </Button>
      </Card.Body>
    </Card>
  );
}

GameCard.propTypes = {
  gameObj: PropTypes.shape({
    gameTitle: PropTypes.string.isRequired,
    youTubeVideo: PropTypes.string.isRequired,
    gamePlatform: PropTypes.string.isRequired,
    firebaseKey: PropTypes.string.isRequired,
    coverPhoto: PropTypes.string.isRequired,
    favorite: PropTypes.bool.isRequired,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
  platform: PropTypes.shape({
    console: PropTypes.string.isRequired,
  }).isRequired,
};

export default GameCard;
