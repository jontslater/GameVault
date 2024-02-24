import { getPlatforms } from './platforms'; // Assuming you have a function to fetch platform data

const mergeGameDataWithPlatforms = async (gameData) => {
  try {
    // Fetch platform data for the game's platform
    const platformData = await getPlatforms(gameData.gamePlatform);

    // Merge the platformData with gameData
    const mergedData = { ...gameData, platformData };

    return mergedData;
  } catch (error) {
    return null;
  }
};

export default mergeGameDataWithPlatforms;
