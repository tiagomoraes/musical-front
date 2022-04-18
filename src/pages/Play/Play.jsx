import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import useTimer from '@hooks/useTimer';
import { getRandomTrack, getAvailableAnswers } from '@utils/tracks';
import useAudio from '@hooks/useAudio';

import Options from '@components/Options';

import {
  Container,
  Countdown,
  PlayAgain,
  StatusContainer,
  StatusDescription,
  StatusTitle,
} from './Play.styles';

function Play() {
  const [status, setStatus] = useState('countdown');
  const [track] = useState(getRandomTrack());

  const navigate = useNavigate();

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
    } else {
      setStatus('failed');
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
          <PlayAgain type="button" onClick={() => navigate('/')}>
            Jogar Novamente
          </PlayAgain>
        </StatusContainer>
      )}

      {status === 'failed' && (
        <StatusContainer>
          <StatusTitle>Não foi dessa vez...</StatusTitle>
          <StatusDescription>Tente novamente na próxima</StatusDescription>
          <PlayAgain type="button" onClick={() => navigate('/')}>
            Jogar Novamente
          </PlayAgain>
        </StatusContainer>
      )}
    </Container>
  );
}

export default Play;
