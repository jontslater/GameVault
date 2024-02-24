import { getSingleGame } from './games';
import { getPlatforms } from './platforms';

const GameDetails = (bookFirebaseKey) => new Promise((resolve, reject) => {
  getSingleGame(bookFirebaseKey)
    .then((bookObject) => {
      getPlatforms(bookObject.author_id)
        .then((authorObject) => {
          resolve({ authorObject, ...bookObject });
        });
    }).catch((error) => reject(error));
});

export default GameDetails;
