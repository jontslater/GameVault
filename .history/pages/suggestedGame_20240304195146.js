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
  const [randomGameIndex, setRandomGameIndex] = useState(null);

  const getAllTheGames = async () => {
    try {
      const gamesData = await getGame(user.uid);
      setGames(gamesData);

      // Assuming viewGameDetails also returns platforms data
      const platformsData = await viewGameDetails(user.uid);
      setPlatforms(platformsData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const getRandomGameIndex = () => Math.floor(Math.random() * games.length);

  const handleSuggested = () => {
    const index = getRandomGameIndex();
    setRandomGameIndex(index);
  };

  useEffect(() => {
    getAllTheGames();
  }, [user.uid]);

  return (
    <div className="text-center my-4">
      <Link href="/game/new" passHref>
        <Button>Add Game</Button>
      </Link>
      <Button onClick={handleSuggested}>Suggest Game</Button>
      {randomGameIndex !== null && (
        <div className="d-flex flex-wrap justify-content-center">
          <GameCard
            key={games[randomGameIndex].firebaseKey}
            gameObj={games[randomGameIndex]}
            onUpdate={getAllTheGames}
            platform={platforms.find((p) => p.firebaseKey === games[randomGameIndex].gamePlatform)}
          />
        </div>
      )}
    </div>
  );
}

export default Home;
