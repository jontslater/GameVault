import { clientCredentials } from '../utils/client';

const endpoint = clientCredentials.databaseURL;

const getGame = (uid) => new Promise((resolve, reject) => {
  fetch(`https://game-vault-47dd1-default-rtdb.firebaseio.com/game.json?orderBy="uid"&equalTo="${uid}"`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(Object.values(data)))
    .catch(reject);
});

const createGame = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/game.json`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const getSingleGame = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/authors/${firebaseKey}.json`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const deleteSingleGame = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/authors/${firebaseKey}.json`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const updateGame = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/authors/${payload.firebaseKey}.json`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const getGamesByPlatform = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/game.json?orderBy="gamePlatform"&equalTo="${firebaseKey}"`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(Object.values(data)))
    .catch(reject);
});

export {
  getGame, createGame, getSingleGame, deleteSingleGame, updateGame, getGamesByPlatform,
};
