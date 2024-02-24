import { getSingleGame } from './games';
import { getSinglePlatform } from './platforms';

const viewGameDetails = (gameFirebaseKey) => new Promise((resolve, reject) => {
  getSingleGame(gameFirebaseKey)
    .then((gameObject) => {
      getSinglePlatform(gameObject.gamePlatform)
        .then((platformObject) => {
          resolve({ platformObject, ...gameObject });
        });
    }).catch((error) => reject(error));
});

export default viewGameDetails;
