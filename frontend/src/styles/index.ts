import { css } from 'styled-components';

const colors = {
  black: 'black',
  white: 'white',
  mainOrange: '#f7971e',
  mainYellow: '#ffd200',
  mainMint: '#429e9d',
  mainGreen: '#22d588',
  mainColor: '#ef2828',
  mainRed: '#ef2828',
};

const orangeGradient = css`
  background: ${colors.mainOrange};
  background: linear-gradient(
    to top,
    ${colors.mainOrange},
    ${colors.mainYellow}
  );
`;

export const styles = {
  colors,
  helpers: {
    orangeGradient,
  },
};
