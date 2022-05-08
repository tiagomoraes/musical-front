import React, { useState, useEffect, useCallback, useMemo } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import Options from '@components/Options';
import { useStem } from '@contexts/StemProvider';
import { getNextPhase } from '@utils/phases';
import { getName } from '@utils/stems';
import useMultiAudio from '@hooks/useMultiAudio';

import { Container, PlayAgain } from './Level.styles';
import { useCorrectTrack } from '../../contexts/CorrectTrackProvider';

function Level({ type, goToPhase }) {
  const [tracks, setTracks] = useState();
  const [selected, setSelected] = useState();

  const navigate = useNavigate();

  const nextPhase = useMemo(() => getNextPhase(type), [type]);

  const typeName = useMemo(() => getName(type), [type]);

  const urls = useMemo(
    () => tracks?.map((id) => `http://localhost:3001/play/${id}/${type}`),
    [tracks, type],
  );

  const [, toggle, stop] = useMultiAudio(urls || []);

  const { track: expected } = useCorrectTrack();

  const { appendStem } = useStem();

  const fetchTracks = useCallback(async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:3001/tracks/${expected.id}`,
      );
      setTracks(data);
    } catch (error) {
      console.error(error);
    }
  }, [expected]);

  const handleNextClick = () => {
    appendStem(type, selected);

    if (!nextPhase) {
      navigate('/results');
      return;
    }

    goToPhase(nextPhase);
  };

  const handleOptionClick = useCallback(
    (id) => {
      const clickedIndex = tracks.indexOf(id);

      if (clickedIndex === -1) {
        return;
      }

      toggle(clickedIndex);
      setSelected(id);
    },
    [toggle, tracks],
  );

  useEffect(() => {
    if (expected) {
      fetchTracks();
    }
  }, [type, expected, fetchTracks]);

  useEffect(() => {
    setSelected(undefined);

    return () => {
      stop();
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [type]);

  return (
    <Container key={type}>
      {tracks && (
        <Options
          options={tracks}
          selected={selected}
          type={typeName}
          onOptionClick={handleOptionClick}
        />
      )}
      <PlayAgain type="button" onClick={handleNextClick} disabled={!selected}>
        Próximo nível
      </PlayAgain>
    </Container>
  );
}

export default Level;
