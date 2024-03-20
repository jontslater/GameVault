import { clientCredentials } from '../utils/client';

const endpoint = clientCredentials.databaseURL;

const getPlatforms = () => new Promise((resolve, reject) => {
  fetch(`${endpoint}/platform.json`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(Object.values(data)))
    .catch(reject);
});

const createPlatform = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/platform.json`, {
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

const getSinglePlatform = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/platform/${firebaseKey}.json`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

export { getPlatforms, createPlatform, getSinglePlatform };
