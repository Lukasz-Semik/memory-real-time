import React from 'react';

import { DashboardPageLayout } from '../Dashboard/DashboardPageLayout/DashboardPageLayout';
import { FriendsTabsList } from './FriendsTabList/FriendsTabList';
import { InviteFriendForm } from './InviteFriendForm/InviteFriendForm';

export const Friends = () => {
  return (
    <DashboardPageLayout title="Friends">
      <InviteFriendForm />
      <FriendsTabsList />
    </DashboardPageLayout>
  );
};
