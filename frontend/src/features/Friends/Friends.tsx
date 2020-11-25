import React from 'react';
import { rem } from 'polished';
import styled from 'styled-components';

import { DashboardPageLayout } from '../Dashboard/DashboardPageLayout/DashboardPageLayout';
import { FriendsTabsList } from './FriendsTabList/FriendsTabList';
import { InviteFriendForm } from './InviteFriendForm/InviteFriendForm';

const Title = styled.h2`
  padding: ${rem(20)};
`;

export const Friends = () => {
  return (
    <DashboardPageLayout>
      <Title>Friends</Title>
      <InviteFriendForm />
      <FriendsTabsList />
    </DashboardPageLayout>
  );
};
