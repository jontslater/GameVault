import { getSingleGame } from './games';
import { getPlatforms } from './platforms'; // Assuming you have a function to fetch platform data

const viewGameDetails = (gameFirebaseKey) => new Promise((resolve, reject) => {
  getSingleGame(gameFirebaseKey)
    .then((gameObject) => {
      getPlatforms(gameObject.console)
        .then((platformObject) => {
          resolve({ platformObject, ...gameObject });
        });
    }).catch((error) => reject(error));
});

export default viewGameDetails;
