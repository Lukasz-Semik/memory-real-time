import React from 'react';
import { rem } from 'polished';
import styled from 'styled-components';

import { useGetCurrentUser } from 'src/store/users/selectors';
import { BasicLayout } from 'src/components/Elements/BasicLayout/BasicLayout';
import { SideBar } from 'src/features/Dashboard/SideBar/SideBar';
import { DashboardRouting } from 'src/features/Dashboard/DashboardRouting/DashboardRouting';

const Title = styled.h1`
  margin: 0;
  padding: 0 ${rem(20)};
  margin: ${rem(20)} 0 ${rem(5)};
`;

const Text = styled.p`
  padding: 0 ${rem(20)};
`;

const Wrapper = styled.div`
  position: relative;
  overflow-x: hidden;
  min-height: 100vh;
  background-color: #eee;
`;

export const DashboardPage = () => {
  const currentUser = useGetCurrentUser();

  return (
    <Wrapper>
      <SideBar />
      <DashboardRouting />
      {/* <Title>Dashboard</Title> */}
      {/* <Text>Nick: {currentUser.nick}</Text> */}
    </Wrapper>
  );
};
