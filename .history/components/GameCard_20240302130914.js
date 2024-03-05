import PropTypes from 'prop-types';
import { Button, Card } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { deleteSingleGame } from '../api/games';
import viewGameDetails from '../api/mergedData';

function GameCard({ gameObj, onUpdate }) {
  const [platform, setPlatform] = useState();

  const deleteThisGame = () => {
    if (window.confirm(`Delete ${gameObj.gameTitle}?`)) {
      deleteSingleGame(gameObj.firebaseKey).then(() => onUpdate());
    }
  };

  useEffect(() => {
    viewGameDetails(gameObj.firebaseKey).then((data) => {
      setPlatform(data.platform);
    });
  }, [gameObj.firebaseKey]);

  return (
    <Card style={{ width: '18rem', margin: '10px' }}>
      <Card.Body>
        <Card.Img variant="top" src={gameObj.coverPhoto} alt={gameObj.gameTitle} style={{ height: '400px' }} />
        <Card.Title>{gameObj.gameTitle}</Card.Title>
        {platform && (
          <p>{`💽${platform.console}`}</p>
        )}
        <p className="card-text bold">{gameObj.favorite && <span>🤍Favorite<br /></span>}</p>
        <p className="card-text bold">{gameObj.played && <span>✔️Played<br /></span>}</p>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css" integrity="sha512-FQWW4n6PqDZ81BAeb5Gor0wIPl9xQZjXM7ZRfj2Qtxms3unH2w0IgJKhj0Rf6rVJQgOGzwLOdNoAURPtL8M+lw==" crossOrigin="anonymous" referrerPolicy="no-referrer" />

        <Link href={`/game/${gameObj.firebaseKey}`} passHref>
          <Button variant="primary" className="m-2">VIEW</Button>
        </Link>
        <Link href={`/game/edit/${gameObj.firebaseKey}`} passHref>
          <Button variant="info">EDIT</Button>
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
    played: PropTypes.bool,
    coverPhoto: PropTypes.string.isRequired,
    favorite: PropTypes.bool.isRequired,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default GameCard;
