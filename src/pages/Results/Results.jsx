import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import { useStem } from '@contexts/StemProvider';
import { useCorrectTrack } from '@contexts/CorrectTrackProvider';
import useMultiAudio from '@hooks/useMultiAudio';

import Button from '@components/Button';

import { getTrack } from '@utils/tracks';
import {
  Bold,
  Container,
  StatusDescription,
  StatusTitle,
} from './Results.styles';

function Results() {
  const navigate = useNavigate();
  const [playing, setPlaying] = useState(false);
  const [populatedStems, setPopulatedStems] = useState();

  const { stem, clearStem } = useStem();
  const { track, updateTrack } = useCorrectTrack();

  const urls = useMemo(() => {
    if (!stem) {
      return [];
    }

    return Object.entries(stem)?.map(
      ([type, s]) => `http://localhost:3001/play/${s}/${type}`,
    );
  }, [stem]);

  const score = useMemo(() => {
    if (!stem) {
      return 0;
    }

    let counter = 0;

    Object.values(stem)?.forEach((stemId) => {
      if (stemId === track?.id) {
        counter += 1;
      }
    });

    return counter;
  }, [stem, track?.id]);

  const { playAll, stopAll } = useMultiAudio(urls);

  const handlePlayAgain = useCallback(() => {
    updateTrack();
    clearStem();
    navigate('/');
  }, [clearStem, navigate, updateTrack]);

  const togglePlaying = useCallback(() => {
    if (playing) {
      stopAll();
      setPlaying(false);
    } else {
      playAll();
      setPlaying(true);
    }
  }, [playAll, playing, stopAll]);

  const fetchPopulatedStems = useCallback(async () => {
    if (!stem) {
      return;
    }

    const res = await Promise.all(
      Object.entries(stem)?.map(async ([key, value]) => {
        const trackObject = await getTrack(value);
        return {
          key,
          value: trackObject,
        };
      }),
    );

    const find = (desiredKey) =>
      res.find(({ key }) => key === desiredKey)?.value;

    setPopulatedStems({
      bass: find('bass'),
      drums: find('drums'),
      other: find('other'),
      vocals: find('vocals'),
    });
  }, [stem]);

  useEffect(() => {
    if (!stem) {
      handlePlayAgain();
    }
  }, [handlePlayAgain, stem]);

  useEffect(() => {
    if (stem) {
      fetchPopulatedStems();
    }
  }, [fetchPopulatedStems, stem]);

  return (
    <Container>
      <StatusTitle>Pontuação Final: {score}/4</StatusTitle>
      {populatedStems && (
        <>
          <StatusDescription>
            Você escolheu o baixo de <Bold>{populatedStems.bass?.name}</Bold>
          </StatusDescription>
          <StatusDescription>
            Você escolheu a bateria de <Bold>{populatedStems.drums?.name}</Bold>
          </StatusDescription>
          <StatusDescription>
            Você escolheu os instrumentos extras de{' '}
            <Bold>{populatedStems.other?.name}</Bold>
          </StatusDescription>
          <StatusDescription>
            Você escolheu o vocal de <Bold>{populatedStems.vocals?.name}</Bold>
          </StatusDescription>
        </>
      )}
      <Button onClick={togglePlaying}>Ouvir Música Gerada</Button>
      <Button onClick={handlePlayAgain}>Jogar Novamente</Button>
    </Container>
  );
}

export default Results;
