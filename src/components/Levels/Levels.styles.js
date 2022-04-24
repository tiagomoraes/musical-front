import styled from 'styled-components';

export const Container = styled.div`
  min-height: 100vh;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const Countdown = styled.div`
  font-size: 8rem;
  font-weight: 700;
`;

export const StatusContainer = styled.div`
  max-width: 500px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const StatusTitle = styled.h2`
  margin-bottom: 0;

  font-size: 2rem;
  font-weight: 700;
  text-align: center;
`;

export const StatusDescription = styled.p`
  font-size: 1rem;
  text-align: center;
`;

export const PlayAgain = styled.button`
  padding: 10px 30px;
  margin-top: 30px;

  font-size: 1.2rem;
  font-weight: 700;
  cursor: pointer;
`;
