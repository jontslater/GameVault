import { getGame } from './games';
import { getPlatforms } from './platforms';

const viewGameDetails = () => new Promise((resolve, reject) => {
  getGame()
    .then((gameObject) => {
      getPlatforms(gameObject.gamePlatform)
        .then((platformObject) => {
          resolve(platformObject); // Return platformObject directly
        });
    }).catch((error) => reject(error));
});

export default viewGameDetails;
