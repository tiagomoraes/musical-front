import styled from 'styled-components';
import { colors } from '@constants/colors';

export const Container = styled.div`
  min-height: 100vh;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const PlayButton = styled.button`
  padding: 20px 50px;
  font-size: 2rem;
  font-weight: 700;

  cursor: pointer;
  background-color: ${colors.primary};
  color: ${colors.background};
  border-color: ${colors.secondary};
`;
