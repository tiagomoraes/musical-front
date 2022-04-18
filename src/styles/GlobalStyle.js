import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700&display=swap');

  html, body {
    margin: 0;
    font-family: 'Montserrat', sans-serif;
  }

  button, input {
    font-family: 'Montserrat', sans-serif;
  }
`;

export default GlobalStyle;
