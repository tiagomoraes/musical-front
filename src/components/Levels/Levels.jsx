import React, { useState, useEffect } from 'react';

import useTimer from '@hooks/useTimer';
import { getAvailableAnswers } from '@utils/tracks';
import useAudio from '@hooks/useAudio';
import Options from '@components/Options';
import {
  Container,
  Countdown,
  PlayAgain,
  StatusContainer,
  StatusDescription,
  StatusTitle,
} from './Levels.styles';

function Levels({ track, handleScore, handleNextLevel }) {
  const [status, setStatus] = useState('countdown');

  const { timeLeft } = useTimer({
    stop: () => setStatus('choice'),
    isRunning: status === 'countdown',
    time: 5000,
  });

  const { play, pause } = useAudio({
    url: `http://localhost:3001/${track.id}`,
  });

  const handleOptionClick = (clickedId) => {
    pause();

    if (clickedId === track.id) {
      setStatus('success');
      handleScore(1);
    } else {
      setStatus('failed');
      handleScore(0);
    }
  };

  useEffect(() => {
    if (status === 'choice') {
      play();
    }
  }, [status, play]);

  return (
    <Container>
      {status === 'countdown' && timeLeft && (
        <Countdown>{timeLeft.seconds}</Countdown>
      )}

      {status === 'choice' && (
        <Options
          options={getAvailableAnswers(track.id)}
          onOptionClick={handleOptionClick}
        />
      )}

      {status === 'success' && (
        <StatusContainer>
          <StatusTitle>Parabéns!!!</StatusTitle>
          <StatusDescription>Você conseguiu acertar a música</StatusDescription>
          <PlayAgain type="button" onClick={handleNextLevel}>
            Próximo nível
          </PlayAgain>
        </StatusContainer>
      )}

      {status === 'failed' && (
        <StatusContainer>
          <StatusTitle>Não foi dessa vez...</StatusTitle>
          <StatusDescription>Tente novamente na próxima</StatusDescription>
          <PlayAgain type="button" onClick={handleNextLevel}>
            Próximo nível
          </PlayAgain>
        </StatusContainer>
      )}
    </Container>
  );
}

export default Levels;
