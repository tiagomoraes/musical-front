import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useMemo,
} from 'react';

const StemContext = createContext({});

function StemProvider({ children }) {
  const [stem, setStem] = useState({
    bass: undefined,
    drums: undefined,
    other: undefined,
    voice: undefined,
  });

  const appendStem = useCallback((type, value) => {
    setStem((prevStem) => ({
      ...prevStem,
      [type]: value,
    }));
  }, []);

  const value = useMemo(
    () => ({
      stem,
      setStem,
      appendStem,
    }),
    [appendStem, stem],
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
