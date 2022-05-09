import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useMemo,
} from 'react';

const StemContext = createContext({});

function StemProvider({ children }) {
  const [stem, setStem] = useState();

  const appendStem = useCallback((type, value) => {
    setStem((prevStem) => ({
      ...prevStem,
      [type]: value,
    }));
  }, []);

  const clearStem = useCallback((type, value) => {
    setStem(undefined);
  }, []);

  const value = useMemo(
    () => ({
      stem,
      setStem,
      appendStem,
      clearStem,
    }),
    [appendStem, clearStem, stem],
  );

  return <StemContext.Provider value={value}>{children}</StemContext.Provider>;
}

export default StemProvider;

export const useStem = () => {
  const context = useContext(StemContext);

  if (!context) {
    throw new Error('useStem must be used whithin an StemProvider');
  }

  return context;
};
