/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import Link from 'next/link';
import { useAuth } from '../utils/context/authContext';
import { getGame } from '../api/games';
import GameCard from '../components/GameCard';

function Home() {
  const { user } = useAuth();
  const [games, setGames] = useState([]);

  const getAllTheGames = async () => {
    getGame(user.uid).then(setGames);
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
