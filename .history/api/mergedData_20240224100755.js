import { getSingleGame } from './games';
import { getSinglePlatform } from './platforms';

const viewGameDetails = () => new Promise((resolve, reject) => {
  getSingleGame()
    .then((gameObject) => {
      getSinglePlatform(gameObject.gamePlatform)
        .then((platformObject) => {
          resolve({ platformObject, ...gameObject });
        });
    }).catch((error) => reject(error));
});

export default viewGameDetails;
