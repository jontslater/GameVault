import PropTypes from 'prop-types';
import { Button, Card } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { deleteSingleGame } from '../api/games';
import viewGameDetails from '../api/mergedData';

function GameCard({ gameObj, onUpdate }) {
  const [platform, setPlatform] = useState(null);

  const deleteThisGame = () => {
    if (window.confirm(`Delete ${gameObj.gameTitle}?`)) {
      deleteSingleGame(gameObj.firebaseKey).then(() => onUpdate());
    }
  };

  useEffect(() => {
    viewGameDetails(gameObj.firebaseKey).then((data) => {
      setPlatform(data.platform);
    }).catch((error) => {
      console.error('Error:', error);
    });
  }, [gameObj.firebaseKey]);

  return (
    <Card style={{ width: '18rem', margin: '10px' }}>
      <Card.Body>
        <Card.Img variant="top" src={gameObj.coverPhoto} alt={gameObj.gameTitle} style={{ height: '400px' }} />
        <Card.Title>{gameObj.gameTitle}</Card.Title>
        {platform && (
          <p>Console: {platform.console}</p>
        )}
        <p className="card-text bold">{gameObj.favorite && <span>Favorite<br /></span>}</p>
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
    firebaseKey: PropTypes.string,
    coverPhoto: PropTypes.string.isRequired,
    favorite: PropTypes.bool.isRequired,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default GameCard;
