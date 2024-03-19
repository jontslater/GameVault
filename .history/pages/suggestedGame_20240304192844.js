import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import Link from 'next/link';
import { useAuth } from '../utils/context/authContext';
import GameCard from '../components/GameCard';
import viewGameDetails from '../api/mergedData';

function Home() {
  const { user } = useAuth();
  const [platforms, setPlatforms] = useState([]);
  const [randomGame, setRandomGame] = useState(null);

  const getRandomGame = async () => {
    try {
      const gamesData = await viewGameDetails(user.uid);
      const randomIndex = Math.floor(Math.random() * gamesData.length);
      setRandomGame(gamesData[randomIndex]);

      // Assuming viewGameDetails also returns platforms data
      setPlatforms(gamesData[randomIndex].platforms);
    } catch (error) {
      // Handle error
    }
  };

  useEffect(() => {
    getRandomGame();
  }, [user.uid]);

  return (
    <div className="text-center my-4">
      <Link href="/game/new" passHref>
        <Button>Add Game</Button>
      </Link>
      <Link href="/suggestedGame" passHref>
        <Button>Suggest Game</Button>
      </Link>
      {randomGame && (
        <div className="d-flex justify-content-center">
          <GameCard key={randomGame.firebaseKey} gameObj={randomGame} onUpdate={getRandomGame} platform={platforms.find((p) => p.firebaseKey === randomGame.gamePlatform)} />
        </div>
      )}
    </div>
  );
}

export default Home;
