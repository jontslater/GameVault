import { getSingleGame } from './games';
import { getSinglePlatform } from './platforms';

const viewGameDetails = (FirebaseKey) => new Promise((resolve, reject) => {
  getSingleGame(FirebaseKey)
    .then((gameObject) => {
      getSinglePlatform(gameObject.gamePlatform)
        .then((platformObject) => {
          resolve({ platformObject, ...gameObject });
        });
    }).catch((error) => reject(error));
});

export default viewGameDetails;
