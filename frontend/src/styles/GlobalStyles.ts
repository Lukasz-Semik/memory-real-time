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
    background-color: ${styles.colors.mainOrange};
    color: ${styles.colors.black};
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
