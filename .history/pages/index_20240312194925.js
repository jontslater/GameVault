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

  const getAllTheGames = async () => {
    try {
      const gamesData = await getGame(user.uid);
      setGames(gamesData);

      const platformsData = await viewGameDetails(user.uid);
      setPlatforms(platformsData);
    } catch (error) {
      // console.error('Error fetching data:', error);
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
      <br />
      <div>
        <img src={user?.photoURL} className="proPic" alt="user" style={{ width: '75px' }} />
        <Link href="/user/new/" passHref>
          <Button variant="warning" className="action-button">EDIT</Button>
        </Link>
      </div>
      <div className="d-flex flex-wrap">
        {games.map((game) => {
          const platform = platforms.map((p) => p.firebaseKey === game.gamePlatform);
          return (
            <GameCard
              key={game.firebaseKey}
              gameObj={game}
              onUpdate={getAllTheGames}
              platform={platform}
            />
          );
        })}
      </div>
    </div>
  );
}

export default Home;