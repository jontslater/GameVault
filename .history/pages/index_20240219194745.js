import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from 'react-bootstrap';
import { useAuth } from '../utils/context/authContext';
import { getBooks } from '../api/bookData';
import BookCard from '../components/BookCard';

function Home() {
  const { user } = useAuth();

  return (
    <>
      <h1>{user.displayName}! </h1>
    </>
  );
}

export default Home;
