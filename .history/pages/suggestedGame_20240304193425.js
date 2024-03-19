import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import Link from 'next/link';
import { useAuth } from '../utils/context/authContext';
import GameCard from '../components/GameCard';
import viewGameDetails from '../api/mergedData';
import { getGame } from '../api/games';

function Suggested() {
  const { user } = useAuth();
  const [games, setGames] = useState([]);
  const [platforms, setPlatforms] = useState([]);
  const [randomGame, setRandomGame] = useState(null);

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

  const getRandomGame = async () => {
    try {
      const gamesData = await viewGameDetails(user.uid);
      const randomIndex = Math.floor(Math.random() * gamesData.length);
      setRandomGame(gamesData[randomIndex]);
    } catch (error) {
      // Handle error
    }
  };

  const handleSuggested = () => {
    getRandomGame();
  };

  useEffect(() => {
    getGames();
    getRandomGame();
  }, [user.uid]);

  return (
    <div className="text-center my-4">
      <Link href="/game/new" passHref>
        <Button>Add Game</Button>
      </Link>
      <Button onClick={handleSuggested}>Suggest Game</Button>
      {randomGame && (
        <div className="d-flex justify-content-center">
          <GameCard key={randomGame.firebaseKey} gameObj={randomGame} onUpdate={getRandomGame} platform={platforms.find((p) => p.firebaseKey === randomGame.gamePlatform)} />
        </div>
      )}
    </div>
  );
}

export default Suggested;
