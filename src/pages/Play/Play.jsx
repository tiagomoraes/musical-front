import React, { useState } from 'react';

import { phases } from '@constants/phases';
import { useCorrectTrack } from '@contexts/CorrectTrackProvider';
import Level from '@components/Level';

import { Container, StatusTitle } from './Play.styles';

function Play() {
  const { track } = useCorrectTrack();

  const [phase, setPhase] = useState(phases[0]);

  return (
    <Container>
      <StatusTitle>{track?.title}</StatusTitle>
      <Level type={phase} goToPhase={setPhase} />
    </Container>
  );
}

export default Play;
