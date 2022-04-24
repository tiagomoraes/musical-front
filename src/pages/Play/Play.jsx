import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { getShuffledTracks } from '@utils/tracks';

import {
  Container,
  StatusContainer,
  StatusDescription,
  StatusTitle,
  PlayAgain,
} from './Play.styles';
import Levels from '../../components/Levels';

function Play() {
  const [tracks] = useState(getShuffledTracks());
  const [level, setLevel] = useState(1);
  const [score, setScore] = useState(0);
  const navigate = useNavigate();

  const handleScore = (points) => {
    setScore(score + points);
  };

  const handleNextLevel = () => {
    setLevel(level + 1);
    console.log(level);
  };

  return (
    <Container>
      {level <= 3 ? (
        <Levels
          track={tracks[level - 1]}
          handleScore={handleScore}
          handleNextLevel={handleNextLevel}
          key={level}
        />
      ) : (
        <StatusContainer>
          <StatusTitle>Parabéns!!!</StatusTitle>
          <StatusDescription>
            Você conseguiu {score} ponto{score > 1 && 's'}!!
          </StatusDescription>
          <PlayAgain type="button" onClick={() => navigate('/')}>
            Jogar novamente
          </PlayAgain>
        </StatusContainer>
      )}
    </Container>
  );
}

export default Play;
