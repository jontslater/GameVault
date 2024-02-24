/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from 'react-bootstrap';
import { useAuth } from '../utils/context/authContext';
// import { getGame } from '../api/games';
import GameCard from '../components/GameCard';
import mergeGameDataWithPlatforms from '../api/mergedData';

function Home() {
  const { user } = useAuth();
  const [games, setGames] = useState([]);

  const getAllTheGames = async () => {
    try {
      const gamesData = await mergeGameDataWithPlatforms(user.uid);
      setGames(gamesData || []); // Provide an empty array if gamesData is null or undefined
    } catch (error) {
      console.error('Error fetching games data:', error);
    }
  };

  useEffect(() => {
    getAllTheGames();
  }, [user.uid]); // Fetch games when the user ID changes

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
            onUpdate={getAllTheGames} // Pass getAllTheGames as a prop
          />
        ))}
      </div>
    </div>
  );
}
export default Home;