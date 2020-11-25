import React, { useContext, useEffect, useState } from 'react';
import { useMutation } from '@apollo/client';
import { rem } from 'polished';
import styled from 'styled-components';

import { styles } from 'src/styles';
import { NotificationsContext } from 'src/features/Dashboard/Notifications/Notifications';
import { LoaderElement } from 'src/components/Elements/LoaderElement/LoaderElement';

import { FriendsList } from './FriendsList';
import { ACCEPT_INVITATION } from './queries';

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;

const Card = styled.div`
  padding: ${rem(20)} 0;
  background-color: white;
  border: 1px solid rgba(0, 0, 0, 0.3);
  box-shadow: 3px 3px 15px rgba(0, 0, 0, 0.3);
`;

const ButtonsWrapper = styled.div`
  margin-bottom: ${rem(20)};
`;

const Button = styled.button<{ isActive: boolean }>`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  padding: 0 ${rem(40)};
  color: ${({ isActive }) => (isActive ? styles.colors.mainOrange : '#888')};
`;

const Counter = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: ${rem(5)};
  width: ${rem(20)};
  height: ${rem(20)};
  background-color: #888;
  border-radius: 50%;
  color: ${styles.colors.white};
  font-size: ${rem(10)};
`;

const LoaderWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const SuccessButton = styled.button`
  font-size: ${rem(12)};
  background-color: ${styles.colors.mainGreen};
  padding: ${rem(5)} ${rem(10)};
  color: ${styles.colors.white};
`;

const RejectButton = styled(SuccessButton)`
  background-color: #ef2828;
`;

const Spacer = styled.div`
  margin-right: ${rem(5)};
`;

const ControlButtonsWrapper = styled.div`
  display: flex;
  align-items: center;
`;

enum Tab {
  Friends = 'friends',
  InvitedFriends = 'invitedFriends',
  Inviters = 'inviters',
}

export const FriendsTabsList = () => {
  const [tab, setTab] = useState<Tab>(Tab.Inviters);
  const {
    friends,
    inviters,
    invitedFriends,
    isLoadingFriends,
    setFriendsState,
  } = useContext(NotificationsContext);

  const [acceptInvitation, { data }] = useMutation(ACCEPT_INVITATION);
  const friendsAfterAcceptInvitation = data?.acceptInvitation;

  useEffect(() => {
    if (friendsAfterAcceptInvitation) {
      setFriendsState(friendsAfterAcceptInvitation);
    }
  }, [friendsAfterAcceptInvitation, setFriendsState]);

  const getList = () => {
    switch (tab) {
      case Tab.Friends:
        return <FriendsList friends={friends} />;
      case Tab.InvitedFriends:
        return <FriendsList friends={invitedFriends} />;
      case Tab.Inviters:
        return (
          <FriendsList
            friends={inviters}
            renderControls={friend => (
              <ControlButtonsWrapper>
                <SuccessButton
                  onClick={() =>
                    acceptInvitation({ variables: { inviterId: friend.id } })
                  }
                >
                  Accept
                </SuccessButton>
                <Spacer />
                <RejectButton>Reject</RejectButton>
              </ControlButtonsWrapper>
            )}
          />
        );
      default:
        return null;
    }
  };

  return (
    <Wrapper>
      <Card>
        <ButtonsWrapper>
          <Button
            isActive={tab === Tab.Friends}
            onClick={() => setTab(Tab.Friends)}
          >
            <Counter>{friends.length}</Counter>
            Friends
          </Button>
          <Button
            isActive={tab === Tab.InvitedFriends}
            onClick={() => setTab(Tab.InvitedFriends)}
          >
            <Counter>{invitedFriends.length}</Counter>
            Invited Friends
          </Button>
          <Button
            isActive={tab === Tab.Inviters}
            onClick={() => setTab(Tab.Inviters)}
          >
            <Counter>{inviters.length}</Counter>
            Invitations
          </Button>
        </ButtonsWrapper>

        {isLoadingFriends ? (
          <LoaderWrapper>
            <LoaderElement
              color={styles.colors.mainOrange}
              size={30}
              isVisible
            />
          </LoaderWrapper>
        ) : (
          getList()
        )}
      </Card>
    </Wrapper>
  );
};
