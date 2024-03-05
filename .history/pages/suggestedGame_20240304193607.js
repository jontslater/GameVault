import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import Link from 'next/link';
import { useAuth } from '../utils/context/authContext';
import GameCard from '../components/GameCard';
import { getGame } from '../api/games';

function Suggested() {
  const { user } = useAuth();
  const [games, setGames] = useState([]);
  const [platforms, setPlatforms] = useState([]);
  const [randomGameIndex, setRandomGameIndex] = useState(null);

  const getGames = async () => {
    try {
      const gamesData = await getGame(user.uid);
      setGames(gamesData);

      // Assuming viewGameDetails also returns platforms data
      setPlatforms(gamesData.flatMap((game) => game.platforms));
    } catch (error) {
      // Handle error
    }
  };

  const getRandomGameIndex = () => Math.floor(Math.random() * games.length);

  const handleSuggested = () => {
    setRandomGameIndex(getRandomGameIndex());
  };

  useEffect(() => {
    getGames();
    setRandomGameIndex(getRandomGameIndex());
  }, [user.uid]);

  return (
    <div className="text-center my-4">
      <Link href="/game/new" passHref>
        <Button>Add Game</Button>
      </Link>
      <Button onClick={handleSuggested}>Suggest Game</Button>
      {randomGameIndex !== null && (
        <div className="d-flex justify-content-center">
          <GameCard key={games[randomGameIndex].firebaseKey} gameObj={games[randomGameIndex]} onUpdate={getGames} platform={platforms.find((p) => p.firebaseKey === games[randomGameIndex].gamePlatform)} />
        </div>
      )}
    </div>
  );
}

export default Suggested;
