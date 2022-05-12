import axios from 'axios';
import { API_URL } from '@constants/remote';

export const getTrack = async (id) => {
  try {
    const { data } = await axios.get(`${API_URL}/track/${id}`);
    return data;
  } catch (error) {
    console.error(error);
  }

  return null;
};
