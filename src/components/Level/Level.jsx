import React, { useState, useEffect, useCallback, useMemo } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

import Options from '@components/Options';
import { useStem } from '@contexts/StemProvider';
import { getNextPhase } from '@utils/phases';
import { phases } from '@constants/phases';

import { Container, PlayAgain } from './Level.styles';
import { useCorrectTrack } from '../../contexts/CorrectTrackProvider';

function Level() {
  const [tracks, setTracks] = useState();
  const [selected, setSelected] = useState();

  const { phase: type } = useParams();

  const { track: expected } = useCorrectTrack();

  const navigate = useNavigate();

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

  const nextPhase = useMemo(() => getNextPhase(type), [type]);

  const handleNextClick = () => {
    appendStem(type, selected);
    navigate(`/play/${nextPhase}`);
  };

  const handleOptionClick = useCallback((id) => {
    setSelected(id);
  }, []);

  useEffect(() => {
    if (expected) {
      fetchTracks();
    }
  }, [expected, fetchTracks]);

  const redirectToHome = useCallback(() => {
    navigate(`/play/${phases[0]}`);
  }, [navigate]);

  useEffect(() => {
    if (phases.indexOf(type) === -1) {
      redirectToHome();
    }
  }, [redirectToHome, type]);

  useEffect(() => {
    setSelected(undefined);
  }, [type]);

  return (
    <Container key={type}>
      {tracks && (
        <Options
          options={tracks}
          selected={selected}
          type={type}
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
