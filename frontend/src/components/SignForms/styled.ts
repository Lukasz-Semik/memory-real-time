import { rem } from 'polished';
import styled from 'styled-components';

export const FormStyled = styled.form`
  display: block;
  width: ${rem(500)};
  margin: ${rem(20)} auto 0 auto;
`;

export const InputWrapper = styled.div`
  margin-bottom: ${rem(20)};
`;

export const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: ${rem(10)};
`;

export const LinkWrapper = styled.div`
  text-align: center;
`;
