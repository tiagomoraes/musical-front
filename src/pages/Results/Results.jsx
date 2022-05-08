import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import { useStem } from '@contexts/StemProvider';
import { useCorrectTrack } from '@contexts/CorrectTrackProvider';
import useMultiAudio from '@hooks/useMultiAudio';

import Button from '@components/Button';

import { Container } from './Results.styles';

function Results() {
  const navigate = useNavigate();
  const [playing, setPlaying] = useState(false);

  const { stem } = useStem();
  const { track } = useCorrectTrack();

  const urls = useMemo(
    () =>
      Object.entries(stem).map(
        ([type, s]) => `http://localhost:3001/play/${s}/${type}`,
      ),
    [stem],
  );

  const { playAll, stopAll } = useMultiAudio(urls || []);

  const handlePlayAgain = () => {
    navigate('/');
  };

  const togglePlaying = useCallback(() => {
    if (playing) {
      stopAll();
      setPlaying(false);
    } else {
      playAll();
      setPlaying(true);
    }
  }, [playAll, playing, stopAll]);

  const score = useMemo(() => {
    let counter = 0;
    Object.values(stem).forEach((stemId) => {
      if (stemId === track?.id) {
        counter += 1;
      }
    });

    return counter;
  }, [stem, track?.id]);

  useEffect(() => {
    if (!stem) {
      navigate('/');
    }
  }, [navigate, stem]);

  return (
    <Container>
      <h1>{score}</h1>
      <Button onClick={togglePlaying}>Ver Resultado</Button>
      <Button onClick={handlePlayAgain}>Jogar Novamente</Button>
    </Container>
  );
}

export default Results;
