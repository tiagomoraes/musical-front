import { createGlobalStyle } from 'styled-components';

import { colors } from '@constants/colors';

const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700&display=swap');

  html, body {
    margin: 0;
    font-family: 'Montserrat', sans-serif;
    background-color: ${colors.background};
  }

  button, input {
    font-family: 'Montserrat', sans-serif;
    border-radius: 20px;
    border-width: 3px;
    background-color: ${colors.primary};
    color: ${colors.background};
    border-color: ${colors.secondary};
  }
`;

export default GlobalStyle;
