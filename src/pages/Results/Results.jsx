import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import { useStem } from '@contexts/StemProvider';
import { useCorrectTrack } from '@contexts/CorrectTrackProvider';
import useMultiAudio from '@hooks/useMultiAudio';

import Button from '@components/Button';

import { Container, StatusDescription, StatusTitle } from './Results.styles';
import { getTrack } from '../../utils/tracks';

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

  const obtained = useMemo(
    () => Object.entries(stem).map(([s]) => getTrack(s)),
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
      <StatusTitle>Pontuação Final: {score}/4</StatusTitle>
      <StatusDescription>
        Você escolheu o baixo de {obtained[0]?.name}
      </StatusDescription>
      <StatusDescription>
        Você escolheu a bateria de {obtained[1]?.name}
      </StatusDescription>
      <StatusDescription>
        Você escolheu os instrumentos extras de {obtained[2]?.name}
      </StatusDescription>
      <StatusDescription>
        Você escolheu o vocal de {obtained[3]?.name}
      </StatusDescription>
      <Button onClick={togglePlaying('obtained')}>Ouvir Música Gerada</Button>
      <Button onClick={handlePlayAgain}>Jogar Novamente</Button>
    </Container>
  );
}

export default Results;
