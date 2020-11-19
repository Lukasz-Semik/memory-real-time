import React from 'react';
import { rem } from 'polished';
import styled from 'styled-components';

const Heading = styled.h1`
  margin: 0;
  text-align: center;
`;

const Wrapper = styled.div`
  margin-top: ${rem(10)};
`;

interface Props {
  title: string;
  children: React.ReactNode;
}

export const BasicLayout = ({ title, children }: Props) => (
  <Wrapper>
    <Heading>{title}</Heading>
    {children}
  </Wrapper>
);
