import { getSingleGame } from './games';
import { getSinglePlatform } from './platforms';

const viewGameDetails = (gameFirebaseKey) => new Promise((resolve, reject) => {
  getSingleGame(gameFirebaseKey)
    .then((gameObject) => {
      getSinglePlatform(gameObject.console).then((platformObject) => {
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
