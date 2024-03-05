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
  const [consoles, setConsoles] = useState([]);

  const getAllTheGames = async () => {
    try {
      const gamesData = await getGame(user.uid);
      setGames(gamesData);

      const platformsData = await viewGameDetails(user.uid);
      const consolesData = platformsData.map((platform) => platform.console);
      setConsoles(consolesData);
    } catch (error) {
      console.error('Error fetching data:', error);
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
            onUpdate={getAllTheGames}
            {consoles.map((console) => (
              <li key={console}>{console}</li>
            ))}
          />
        ))}
      </div>
      <div>
        <h2>Consoles:</h2>
        <ul>
          
        </ul>
      </div>
    </div>
  );
}

export default Home;
