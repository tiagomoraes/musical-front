import React, { useState, useEffect, useCallback, useMemo } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import Options from '@components/Options';
import { useStem } from '@contexts/StemProvider';
import { getNextPhase } from '@utils/phases';
import { getName } from '@utils/stems';
import useMultiAudio from '@hooks/useMultiAudio';
import { useCorrectTrack } from '@contexts/CorrectTrackProvider';
import { API_URL, STORAGE_URL } from '@constants/remote';

import { Container, PlayAgain, StatusTitle } from './Level.styles';

function Level({ type, goToPhase }) {
  const [tracks, setTracks] = useState();
  const [selected, setSelected] = useState();

  const navigate = useNavigate();

  const nextPhase = useMemo(() => getNextPhase(type), [type]);

  const typeName = useMemo(() => getName(type), [type]);

  const urls = useMemo(
    () => tracks?.map((id) => `${STORAGE_URL}/${id}-${type}.mp3`),
    [tracks, type],
  );

  const { toggle } = useMultiAudio(urls || []);
  const { track: expected } = useCorrectTrack();

  const { appendStem } = useStem();

  const fetchTracks = useCallback(async () => {
    try {
      const { data } = await axios.get(`${API_URL}/tracks/${expected.id}`);
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

      setSelected((prevId) => {
        if (prevId === id) {
          return undefined;
        }

        return id;
      });
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
  }, [type]);

  return (
    <Container key={type}>
      <StatusTitle>{typeName}</StatusTitle>
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
