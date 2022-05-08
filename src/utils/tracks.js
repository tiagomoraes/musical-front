import axios from 'axios';

export const getTrack = async (id) => {
  try {
    const { data } = await axios.get(`http://localhost:3001/track/${id}`);
    return data;
  } catch (error) {
    console.error(error);
  }
};
