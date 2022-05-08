import React from 'react';
import { Outlet } from 'react-router-dom';

import { useCorrectTrack } from '@contexts/CorrectTrackProvider';

import { Container, StatusTitle } from './Play.styles';

function Play() {
  const { track } = useCorrectTrack();
  return (
    <Container>
      <StatusTitle>{track?.title}</StatusTitle>
      <Outlet />
    </Container>
  );
}

export default Play;
