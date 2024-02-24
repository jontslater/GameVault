import { getGame } from './games';
import { getPlatforms } from './platforms';

const viewGameDetails = (user.id) => new Promise((resolve, reject) => {
  getGame(user.id)
    .then((gameObject) => {
      getPlatforms(gameObject.gamePlatform)
        .then((platformObject) => {
          resolve(platformObject);
        });
    }).catch((error) => reject(error));
});

export default viewGameDetails;
