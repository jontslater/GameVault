import { getSingleGame } from './games';
import { getPlatforms } from './platforms';

const viewGameDetails = () => new Promise((resolve, reject) => {
  getSingleGame()
    .then((gameObject) => {
      getPlatforms(gameObject.console)
        .then((platformObject) => {
          resolve({ platformObject, ...gameObject });
        });
    }).catch((error) => reject(error));
});

export default viewGameDetails;
