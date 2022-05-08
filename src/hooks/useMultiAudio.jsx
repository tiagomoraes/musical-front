import { useState, useEffect, useCallback } from 'react';

const useMultiAudio = (urls) => {
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
    setPlayers((currentPlayers) => {
      currentPlayers.forEach((p) => {
        p.audio.pause();
      });

      return urls.map((url) => ({
        url,
        audio: new Audio(url),
        playing: false,
      }));
    });
  }, [urls]);

  useEffect(() => {
    players.forEach((p, i) => {
      p.audio.addEventListener('ended', () => {
        const newPlayers = [...players];
        newPlayers[i].playing = false;
        setPlayers(newPlayers);
      });

      if (players[i].playing) {
        // eslint-disable-next-line no-param-reassign
        p.audio.currentTime = 0;
        p.audio.play();
      } else {
        p.audio.pause();
      }
    });

    return () => {
      players.forEach((p, i) => {
        p.audio.removeEventListener('ended', () => {
          const newPlayers = [...players];
          newPlayers[i].playing = false;
          setPlayers(newPlayers);
        });
      });
    };
  }, [players]);

  return [players, toggle, stop];
};

export default useMultiAudio;
