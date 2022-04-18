import React from 'react';
import { useNavigate } from 'react-router-dom';

import { Container, PlayButton } from './Home.styles';

function Home() {
  const navigate = useNavigate();

  const handlePlayClick = () => {
    navigate('/play');
  };

  return (
    <Container>
      <PlayButton type="button" onClick={handlePlayClick}>
        Jogar
      </PlayButton>
    </Container>
  );
}

export default Home;
