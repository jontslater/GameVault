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
      <Card.Body className="text-center">
        <Card.Img variant="top" src={gameObj.coverPhoto} alt={gameObj.gameTitle} style={{ height: '400px' }} />
        <Card.Title>{gameObj.gameTitle}</Card.Title>
        {platform && (
        <p>{`💽${platform.console}`}</p>
        )}
        <p className="card-text bold">{gameObj.favorite && <span>🤍Favorite<br /></span>}</p>
        <p className="card-text bold">{gameObj.played && <span>✔️Played<br /></span>}</p>
        <Button
          variant="primary"
          style={{
            backgroundColor: 'black', color: 'white', width: '150px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '10px',
          }}
          href={gameObj.youTubeVideo}
          target="_blank"
          rel="noopener noreferrer"
        >
          <i className="fab fa-youtube" style={{ color: 'red' }} /> YouTube Video
        </Button>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Link href={`/game/${gameObj.firebaseKey}`} passHref>
            <Button variant="info" className="action-button">VIEW</Button>
          </Link>
          <Link href={`/game/edit/${gameObj.firebaseKey}`} passHref>
            <Button variant="warning" className="action-button">EDIT</Button>
          </Link>
          <Button variant="danger" onClick={deleteThisGame} className="action-button">
            <i className="fas fa-trash-alt" /> DELETE
          </Button>
        </div>
      </Card.Body>
    </Card><Card.Body className="text-center">
  <Card.Img variant="top" src={gameObj.coverPhoto} alt={gameObj.gameTitle} style={{ height: '400px' }} />
  <Card.Title>{gameObj.gameTitle}</Card.Title>
  {platform && (
    <p>{`💽${platform.console}`}</p>
  )}
  <p className="card-text bold">{gameObj.favorite && <span>🤍Favorite<br /></span>}</p>
  <p className="card-text bold">{gameObj.played && <span>✔️Played<br /></span>}</p>
  <Button variant="primary" style={{ backgroundColor: 'black', color: 'white', width: '150px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '10px' }} href={gameObj.youTubeVideo} target="_blank" rel="noopener noreferrer">
    <i className="fab fa-youtube" style={{ color: 'red' }}></i> YouTube Video
  </Button>
  <div style={{ display: 'flex', justifyContent: 'center' }}>
    <Link href={`/game/${gameObj.firebaseKey}`} passHref>
      <Button variant="info" className="action-button">VIEW</Button>
    </Link>
    <Link href={`/game/edit/${gameObj.firebaseKey}`} passHref>
      <Button variant="warning" className="action-button">EDIT</Button>
    </Link>
    <Button variant="danger" onClick={deleteThisGame} className="action-button">
      <i className="fas fa-trash-alt"></i> DELETE
    </Button>
  </div>
</Card.Body>
<Card.Body className="text-center">
  <Card.Img variant="top" src={gameObj.coverPhoto} alt={gameObj.gameTitle} style={{ height: '400px' }} />
  <Card.Title>{gameObj.gameTitle}</Card.Title>
  {platform && (
    <p>{`💽${platform.console}`}</p>
  )}
  <p className="card-text bold">{gameObj.favorite && <span>🤍Favorite<br /></span>}</p>
  <p className="card-text bold">{gameObj.played && <span>✔️Played<br /></span>}</p>
  <Button variant="primary" style={{ backgroundColor: 'black', color: 'white', width: '150px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '10px' }} href={gameObj.youTubeVideo} target="_blank" rel="noopener noreferrer">
    <i className="fab fa-youtube" style={{ color: 'red' }}></i> YouTube Video
  </Button>
  <div style={{ display: 'flex', justifyContent: 'center' }}>
    <Link href={`/game/${gameObj.firebaseKey}`} passHref>
      <Button variant="info" className="action-button">VIEW</Button>
    </Link>
    <Link href={`/game/edit/${gameObj.firebaseKey}`} passHref>
      <Button variant="warning" className="action-button">EDIT</Button>
    </Link>
    <Button variant="danger" onClick={deleteThisGame} className="action-button">
      <i className="fas fa-trash-alt"></i> DELETE
    </Button>
  </div><Card.Body className="text-center">
  <Card.Img variant="top" src={gameObj.coverPhoto} alt={gameObj.gameTitle} style={{ height: '400px' }} />
  <Card.Title>{gameObj.gameTitle}</Card.Title>
  {platform && (
    <p>{`💽${platform.console}`}</p>
  )}
  <p className="card-text bold">{gameObj.favorite && <span>🤍Favorite<br /></span>}</p>
  <p className="card-text bold">{gameObj.played && <span>✔️Played<br /></span>}</p>
  <Button variant="primary" style={{ backgroundColor: 'black', color: 'white', width: '150px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '10px' }} href={gameObj.youTubeVideo} target="_blank" rel="noopener noreferrer">
    <i className="fab fa-youtube" style={{ color: 'red' }}></i> YouTube Video
  </Button>
  <div style={{ display: 'flex', justifyContent: 'center' }}>
    <Link href={`/game/${gameObj.firebaseKey}`} passHref>
      <Button variant="info" className="action-button">VIEW</Button>
    </Link>
    <Link href={`/game/edit/${gameObj.firebaseKey}`} passHref>
      <Button variant="warning" className="action-button">EDIT</Button>
    </Link>
    <Button variant="danger" onClick={deleteThisGame} className="action-button">
      <i className="fas fa-trash-alt"></i> DELETE
    </Button>
  </div>
</Card.Body>

</Card.Body>

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
