import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
} from 'react';
import axios from 'axios';

import { API_URL } from '@constants/remote';

const CorrectTrackContext = createContext({});

function CorrectTrackProvider({ children }) {
  const [track, setTrack] = useState();

  const fetchTrack = useCallback(async () => {
    try {
      const { data } = await axios.get(`${API_URL}/track`);
      setTrack(data);
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    fetchTrack();
  }, [fetchTrack]);

  const value = useMemo(
    () => ({
      track,
      updateTrack: fetchTrack,
    }),
    [fetchTrack, track],
  );

  return (
    <CorrectTrackContext.Provider value={value}>
      {children}
    </CorrectTrackContext.Provider>
  );
}

export default CorrectTrackProvider;

export const useCorrectTrack = () => {
  const context = useContext(CorrectTrackContext);

  if (!context) {
    throw new Error(
      'useCorrectTrack must be used whithin an CorrectTrackProvider',
    );
  }

  return context;
};
