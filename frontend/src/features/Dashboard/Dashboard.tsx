import React, { useContext } from 'react';
import { rem } from 'polished';
import styled from 'styled-components';

import { styles } from 'src/styles';
import { useModalState } from 'src/hooks/useModalState';
import { FriendsList } from 'src/components/Elements/FriendsList/FriendsList';
import { LoaderElement } from 'src/components/Elements/LoaderElement/LoaderElement';
import { ModalElement } from 'src/components/Elements/ModalElement/ModalElement';

import { DashboardPageLayout } from './DashboardPageLayout/DashboardPageLayout';
import { NotificationsContext } from './Notifications/Notifications';

const LoaderWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;

export const Dashboard = () => {
  const [isModalOpen, openModal, closeModal] = useModalState();
  const { friends, isLoadingFriends } = useContext(NotificationsContext);

  return (
    <DashboardPageLayout title="Dashboard">
      <button onClick={openModal}>Play with friend</button>

      {true && (
        <ModalElement
          minWidth={rem(590)}
          title="Play with friend"
          close={closeModal}
          isOpen
        >
          {isLoadingFriends ? (
            <LoaderWrapper>
              <LoaderElement
                size={50}
                color={styles.colors.mainOrange}
                isVisible
              />
            </LoaderWrapper>
          ) : (
            <FriendsList friends={friends} />
          )}
        </ModalElement>
      )}
    </DashboardPageLayout>
  );
};
