/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useAuth } from '../utils/context/authContext';
import { getGame } from '../api/games';
import GameCard from '../components/GameCard';
import { getPlatforms } from '../api/platforms';

function Home() {
  const { user } = useAuth();
  const [games, setGames] = useState([]);
  const [platforms, setPlatforms] = useState([]);
  const getAllTheGames = () => {
    getGame(user.uid).then(setGames);
    getPlatforms().then(setPlatforms);
  };
  useEffect(() => {
    getAllTheGames();
  }, []);

  return (
    <div className="text-center my-4">
      <p>{user.displayName}</p>
      <div className="d-flex flex-wrap">
        {games.map((game) => (
          <GameCard
            key={game.firebaseKey}
            gameObj={game}
            onUpdate={getAllTheGames}
          />
        ))}
      </div>

    </div>
  );
}

export default Home;
