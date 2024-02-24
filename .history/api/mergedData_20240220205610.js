import { getSingleGame } from './games';
import { getPlatforms } from './platforms';

const GameDetails = (gameFirebaseKey) => new Promise((resolve, reject) => {
  getSingleGame(gameFirebaseKey)
    .then((gameObject) => {
      getPlatforms(gameObject.gamePlatform)
        .then((platformObject) => {
          resolve({ platformObject, ...gameObject });
        });
    }).catch((error) => reject(error));
});

export default GameDetails;
