const url = 'http://localhost:3001/';

export const getRandomTrack = async () => {
  try {
    const response = await fetch(url + 'track');
    const responseJson = await response.json();
    return responseJson;
  } catch (error) {
    console.error(error);
  }
};

export const getAvailableAnswers = async (expectedId) => {
  try {
    const response = await fetch(url + 'tracks/' + expectedId);
    const responseJson = await response.json();
    return responseJson;
  } catch (error) {
    console.error(error);
  }
};
// NADA DISSO SENDO USADO POR ENQUANTO
