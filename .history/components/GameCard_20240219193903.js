import PropTypes from 'prop-types';
import { Button, Card } from 'react-bootstrap';
import React from 'react';
import Link from 'next/link';
import { deleteSingleGame } from '../api/games';

function GameCard({ gameObj, onUpdate }) {
  const delete = () => {
    if (window.confirm(`Delete ${gameObj.gameTitle}?`)) {
      deleteAuthorBooks(gameobj.firebaseKey).then(() => onUpdate());
    }
  };
