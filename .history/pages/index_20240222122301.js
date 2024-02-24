/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import Link from 'next/link';
import { useAuth } from '../utils/context/authContext';
import { getGame } from '../api/games';
import GameCard from '../components/GameCard';
import { getPlatforms } from '../api/platforms';
// import { getPlatforms } from '../api/platforms';

function Home() {
  const { user } = useAuth();
  const [games, setGames] = useState([]);

  const getAllTheGames = async () => {
    try {
      const gamesData = await getGame(user.uid);
      const gamesWithPlatforms = await Promise.all(
        gamesData.map(async (game) => {
          const platformData = await getPlatforms(game.gamePlatform).catch(() => null);
          const platformObj = platformData ? platformData.find((platform) => platform.console === game.gamePlatform) : null;
          return { ...game, platformData: platformObj };
        }),
      );
      setGames(gamesWithPlatforms);
    } catch (error) {
      console.error('Error fetching games data:', error);
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
      <div className="d-flex flex-wrap">
        {games.map((game) => (
          <GameCard
            key={game.firebaseKey}
            gameObj={game}
            onUpdate={() => getAllTheGames()}
          />
        ))}
      </div>
    </div>
  );
}

export default Home;
