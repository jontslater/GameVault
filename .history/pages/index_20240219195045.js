/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from 'react-bootstrap';
import { useAuth } from '../utils/context/authContext';
import { getBooks } from '../api/bookData';
import BookCard from '../components/BookCard';
import { getGame } from '../api/games';

function Home() {
  const { user } = useAuth();
  const [games, setGames] = useState([]);
  const getAllTheGames = () => {
    getGame(user.uid).then(setGames);
  };
  useEffect(() => {
    getAllTheGames();
  }, []);

  return (
    <div className="text-center my-4">
      <Link href="/book/new" passHref>
        <Button>Add A Book</Button>
      </Link>
      <div className="d-flex flex-wrap">
        {/* TODO: map over books here using BookCard component */}
        {games.map((game) => (
          <BookCard key={game.Firebasekey} gameObj={game} onUpdate={getAllTheGames} />
        ))}
      </div>

    </div>
  );
}

export default Home;
