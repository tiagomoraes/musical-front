import styled, { css } from 'styled-components';

import { colors } from '@constants/colors';

export const GridContainer = styled.div`
  display: grid;
  gap: 10px;
`;

export const Button = styled.button`
  width: 200px;
  flex: 1;
  padding: 20px 40px;

  font-size: 0.9rem;
  cursor: pointer;
  background-color: ${colors.highlight};
  color: ${colors.background};
  border-color: ${colors.highlight};

  ${({ selected }) =>
    selected &&
    css`
      border: 2px solid ${colors.action};
    `}
`;

export const TitleHighlight = styled.span`
  display: inline-block;
  font-size: 1.2rem;
  font-weight: 600;
`;
