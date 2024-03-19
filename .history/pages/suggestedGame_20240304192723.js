import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import Link from 'next/link';
import { useAuth } from '../utils/context/authContext';
import { getGame } from '../api/games';
import GameCard from '../components/GameCard';
import viewGameDetails from '../api/mergedData';

function Home() {
  const { user } = useAuth();
  const [games, setGames] = useState([]);
  const [platforms, setPlatforms] = useState([]);
  const [randomGame, setRandomGame] = useState(null);

  const getAllTheGames = async () => {
    try {
      const gamesData = await getGame(user.uid);
      setGames(gamesData);

      const platformsData = await viewGameDetails(user.uid);
      setPlatforms(platformsData);

      // Select a random game from the games array
      const randomIndex = Math.floor(Math.random() * gamesData.length);
      setRandomGame(gamesData[randomIndex]);
    } catch (error) {
      // Handle error
    }
  };

  useEffect(() => {
    getAllTheGames();
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
          <GameCard key={randomGame.firebaseKey} gameObj={randomGame} onUpdate={getAllTheGames} platform={platforms.find((p) => p.firebaseKey === randomGame.gamePlatform)} />
        </div>
      )}
    </div>
  );
}

export default Home;
