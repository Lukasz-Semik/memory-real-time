import React from 'react';
import styled from 'styled-components';

import { DashboardRouting } from 'src/features/Dashboard/DashboardRouting/DashboardRouting';
import { SideBar } from 'src/features/Dashboard/SideBar/SideBar';

const Wrapper = styled.div`
  position: relative;
  overflow-x: hidden;
  min-height: 100vh;
  background-color: #eee;
`;

export const DashboardPage = () => {
  return (
    <Wrapper>
      <SideBar />
      <DashboardRouting />
    </Wrapper>
  );
};
