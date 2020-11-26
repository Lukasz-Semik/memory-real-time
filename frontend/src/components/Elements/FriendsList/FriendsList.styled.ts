import { rem } from 'polished';
import styled from 'styled-components';

import { styles } from 'src/styles';

export const SuccessButton = styled.button`
  font-size: ${rem(12)};
  background-color: ${styles.colors.mainGreen};
  padding: ${rem(5)} ${rem(10)};
  color: ${styles.colors.white};
`;

export const RejectButton = styled(SuccessButton)`
  background-color: ${styles.colors.mainRed};
`;

export const Spacer = styled.div`
  margin-right: ${rem(5)};
`;

export const ControlButtonsWrapper = styled.div`
  display: flex;
  align-items: center;
`;
