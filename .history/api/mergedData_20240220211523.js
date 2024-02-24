import { getPlatforms } from './platforms'; // Assuming you have a function to fetch platform data

const mergeGameDataWithPlatforms = async (gameData) => {
  try {
    const platformData = await getPlatforms(gameData.gamePlatform);
    const mergedData = { ...gameData, platformData };

    return mergedData;
  } catch (error) {
    return null;
  }
};

export default mergeGameDataWithPlatforms;
