import { getSingleGame } from './games';
import { getSinglePlatform } from './platforms';

const viewGameDetails = (gameFirebaseKey) => new Promise((resolve, reject) => {
  getSingleGame(gameFirebaseKey)
    .then((gameObject) => {
      const gamePlatformFirebaseKey = gameObject.gamePlatform;
      getSinglePlatform(gamePlatformFirebaseKey)
        .then((platformObject) => {
          const mergedData = { ...gameObject, platform: platformObject };
          resolve(mergedData);
        })
        .catch((error) => reject(error));
    })
    .catch((error) => reject(error));
});

export default viewGameDetails;
