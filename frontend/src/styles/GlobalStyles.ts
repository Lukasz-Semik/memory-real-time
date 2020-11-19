import { createGlobalStyle } from 'styled-components';

import { styles } from '.';

export const GlobalStyles = createGlobalStyle`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  html {
    font-family: 'Roboto', sans-serif;
  }

  body {
    overflow: hidden;
    background-color: #122;
    color: ${styles.colors.white};
  }

  a {
    text-decoration: none;
  }

  button {
    cursor: pointer;
    outline: none;
    border: none;
    background-color: transparent;
  }
`;
