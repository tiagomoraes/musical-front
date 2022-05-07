import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { getRandomTrack, getAvailableAnswers } from '@utils/tracks';

import {
  Container,
  StatusContainer,
  StatusDescription,
  StatusTitle,
  PlayAgain,
} from './Play.styles';
import Levels from '../../components/Levels';
import axios from 'axios';

function Play() {
  const navigate = useNavigate();

  const [level, setLevel] = useState(1);
  const [stem, setStem] = useState({
    bass: undefined,
    drums: undefined,
    other: undefined,
    voice: undefined,
  });

  const [track, setTrack] = useState();

  const fetchTrack = useCallback(async () => {
    const { data } = await axios.get('http://localhost:3001/track');
    setTrack(data);
  }, []);

  useEffect(() => {
    fetchTrack();
  }, [fetchTrack]);

  console.log(track);

  const handleNextLevel = () => {
    setLevel(level + 1);
  };

  const handleStem = (id, type) => {
    switch (type) {
      case 'bass':
        setStem({ ...stem, bass: id });
      case 'drums':
        setStem({ ...stem, drums: id });
      case 'other':
        setStem({ ...stem, other: id });
      case 'voice':
        setStem({ ...stem, voice: id });
    }
  };

  return (
    <Container>
      <StatusTitle>{track.title}</StatusTitle>
      {level == 1 ? ( // baixo
        <Levels
          expected={track.id}
          handleStem={handleStem}
          handleNextLevel={handleNextLevel}
          key={level}
          type="bass"
        />
      ) : level == 2 ? ( // bateria
        <Levels
          expected={track.id}
          handleStem={handleStem}
          handleNextLevel={handleNextLevel}
          key={level}
          type="drums"
        />
      ) : level == 3 ? ( // extra
        <Levels
          expected={track.id}
          handleStem={handleStem}
          handleNextLevel={handleNextLevel}
          key={level}
          type="other"
        />
      ) : level == 4 ? ( // voice
        <Levels
          expected={track.id}
          handleStem={handleStem}
          handleNextLevel={handleNextLevel}
          key={level}
          type="voice"
        />
      ) : (
        // <StatusContainer>
        //   <StatusTitle>Parabéns!!!</StatusTitle>
        //   <StatusDescription>
        //     Você conseguiu {score} ponto{score > 1 && 's'}!!
        //   </StatusDescription>
        //   <PlayAgain type="button" onClick={() => navigate('/')}>
        //     Jogar novamente
        //   </PlayAgain>
        // </StatusContainer>
        <Result expectedTrack={track} obtainedStem={stem} /> // TO-DO
      )}
    </Container>
  );
}

export default Play;
