import { useState, useEffect, useCallback } from 'react';

function useAudio({ url, onEnd }) {
  const [audio] = useState(new Audio(url));
  const [playing, setPlaying] = useState(false);

  const toggle = useCallback(() => setPlaying(!playing), [playing]);
  const play = useCallback(() => setPlaying(true), []);
  const pause = useCallback(() => setPlaying(false), []);

  const handleEnd = useCallback(() => {
    if (onEnd) {
      onEnd();
    }

    pause();
    audio.currentTime = 0;
  }, [audio, onEnd, pause]);

  useEffect(() => {
    if (!url) {
      return;
    }

    if (playing) {
      audio.play();
      return;
    }

    audio.pause();
  }, [audio, playing, url]);

  useEffect(() => {
    audio.addEventListener('ended', handleEnd);
    return () => {
      audio.removeEventListener('ended', handleEnd);
    };
  }, [audio, handleEnd]);

  return { playing, toggle, play, pause };
}

export default useAudio;
