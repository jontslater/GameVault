import { getGame } from './games';
import { getPlatforms } from './platforms';

const viewGameDetails = (taco) => new Promise((resolve, reject) => {
  getGame(taco)
    .then((gameObject) => {
      getPlatforms(gameObject.gamePlatform)
        .then((platformObject) => {
          resolve(platformObject);
        });
    }).catch((error) => reject(error));
});

export default viewGameDetails;
