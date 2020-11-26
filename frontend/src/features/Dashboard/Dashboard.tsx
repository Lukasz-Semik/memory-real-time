import React from 'react';

import { useModalState } from 'src/hooks/useModalState';
import { GameStarter } from 'src/features/Game/GameStarter/GameStarter';

import { DashboardPageLayout } from './DashboardPageLayout/DashboardPageLayout';

export const Dashboard = () => {
  const [isModalOpen, openModal, closeModal] = useModalState();

  return (
    <DashboardPageLayout title="Dashboard">
      <button onClick={openModal}>Play with friend</button>

      {isModalOpen && <GameStarter closeModal={closeModal} />}
    </DashboardPageLayout>
  );
};
