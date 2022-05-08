import React, { useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

import { useStem } from '@contexts/StemProvider';
import { useCorrectTrack } from '@contexts/CorrectTrackProvider';

import Button from '@components/Button';

import { Container } from './Results.styles';

function Results() {
  const navigate = useNavigate();

  const { stem } = useStem();
  const { track } = useCorrectTrack();

  const handlePlayAgain = () => {
    navigate('/');
  };

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
      <Button onClick={handlePlayAgain}>Jogar Novamente</Button>
    </Container>
  );
}

export default Results;
