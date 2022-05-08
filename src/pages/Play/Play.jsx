import React, { useState } from 'react';

import { phases } from '@constants/phases';
import { useCorrectTrack } from '@contexts/CorrectTrackProvider';
import Level from '@components/Level';

import { Container, StatusDescription, StatusTitle } from './Play.styles';

function Play() {
  const { track } = useCorrectTrack();

  const [phase, setPhase] = useState(phases[0]);

  return (
    <Container>
      <StatusTitle>{track?.name}</StatusTitle>
      <StatusDescription>
        Clique na opção correspondente à música {track?.name} de {track?.artist}
      </StatusDescription>
      <Level type={phase} goToPhase={setPhase} />
    </Container>
  );
}

export default Play;
