import { getGame } from './games';

const viewGameDetails = (gameFirebaseKey) => new Promise((resolve, reject) => {
  getGame(gameFirebaseKey)
    .then((gameObject) => {
      getPlatforms(gameObject.console).then((platformObject) => {
        resolve({ platformObject, ...gameObject });
      });
    }).catch((error) => reject(error));
  viewGameDetails(gameFirebaseKey)
    .then((result) => {
      console.log(result);
    })
    .catch((error) => {
      console.error('Error:', error);
    });
});

export default viewGameDetails;
