import { getSingleGame } from './games';
import { getPlatforms } from './platforms';

const gamePlatforms = (gameFirebaseKey) => new Promise((resolve, reject) => {
  getSingleGame(gameFirebaseKey)
    .then((gameObject) => {
      getPlatforms(gameObject.Firebasekey)
        .then((fullGameObject) => {
          resolve({ fullGameObject, ...gameObject });
        });
    }).catch((error) => reject(error));
});

export default gamePlatforms;
