import React, { useState, useEffect } from 'react';

import Options from '@components/Options';
import { Container, PlayAgain } from './Levels.styles';

function Levels({ expected, handleStem, handleNextLevel, key, type }) {
  const [tracks, setTracks] = useState();
  const [clickedId, setClickedId] = useState();

  const fetchTracks = useCallback(async () => {
    const { data } = await axios.get(
      'http://localhost:3001//tracks/' + expected,
    );
    setTracks(data);
  }, []);

  useEffect(() => {
    fetchTracks();
  }, [fetchTracks]);

  const handleOptionClick = (id) => {
    setClickedId(id);
  };

  const handleButtonClick = () => {
    handleStem(clickedId, type);
    handleNextLevel();
  };

  return (
    <Container key={key}>
      <Options options={tracks} onOptionClick={handleOptionClick} type={type} />
      <PlayAgain
        type="button"
        onClick={handleButtonClick}
        disabled={!clickedId}
      >
        Próximo nível
      </PlayAgain>
    </Container>
  );
}

export default Levels;
