import { useState, useEffect, useCallback } from 'react';

const useMultiAudio = (urls) => {
  const [sources, setSources] = useState([]);

  const [players, setPlayers] = useState([]);

  const toggle = useCallback(
    (targetIndex) => {
      const newPlayers = [...players];
      const currentIndex = players.findIndex((p) => p.playing === true);
      if (currentIndex !== -1 && currentIndex !== targetIndex) {
        newPlayers[currentIndex].playing = false;
        newPlayers[targetIndex].playing = true;
      } else if (currentIndex !== -1) {
        newPlayers[targetIndex].playing = false;
      } else {
        newPlayers[targetIndex].playing = true;
      }
      setPlayers(newPlayers);
    },
    [players],
  );

  const stop = useCallback(() => {
    setPlayers((oldPlayers) =>
      oldPlayers.map((p) => ({ ...p, playing: false })),
    );
  }, []);

  useEffect(() => {
    stop();

    console.log('urls changed');

    setSources(
      urls.map((url) => ({
        url,
        audio: new Audio(url),
      })),
    );

    setPlayers(
      urls.map((url) => ({
        url,
        playing: false,
      })),
    );
  }, [urls, stop]);

  useEffect(() => {
    if (!sources || !players) {
      return;
    }

    sources.forEach((source, i) => {
      if (players[i].playing) {
        source.audio.play();
        return;
      }

      source.audio.pause();
    });
  }, [sources, players]);

  useEffect(() => {
    if (!sources || !players) {
      return null;
    }

    sources.forEach((source, i) => {
      source.audio.addEventListener('ended', () => {
        const newPlayers = [...players];
        newPlayers[i].playing = false;
        setPlayers(newPlayers);
      });
    });

    return () => {
      sources.forEach((source, i) => {
        source.audio.removeEventListener('ended', () => {
          const newPlayers = [...players];
          newPlayers[i].playing = false;
          setPlayers(newPlayers);
        });
      });
    };
  }, [players, sources]);

  return [players, toggle, stop];
};

export default useMultiAudio;
