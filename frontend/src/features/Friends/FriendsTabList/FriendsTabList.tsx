import React, { useContext, useState } from 'react';
import { rem } from 'polished';
import styled from 'styled-components';

import { styles } from 'src/styles';
import { NotificationsContext } from 'src/features/Dashboard/Notifications/Notifications';
import { FriendsList } from 'src/components/Elements/FriendsList/FriendsList';
import {
  ControlButtonsWrapper,
  RejectButton,
  Spacer,
  SuccessButton,
} from 'src/components/Elements/FriendsList/FriendsList.styled';
import { LoaderElement } from 'src/components/Elements/LoaderElement/LoaderElement';

import { useFriendsChanges } from './useFriendsChanges';

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

enum Tab {
  Friends = 'friends',
  InvitedFriends = 'invitedFriends',
  Inviters = 'inviters',
}

export const FriendsTabsList = () => {
  const [tab, setTab] = useState<Tab>(Tab.Friends);
  const { friends, inviters, invitedFriends, isLoadingFriends } = useContext(
    NotificationsContext
  );

  const {
    acceptInvitation,
    rejectInvitation,
    removeFriend,
    cancelInvitation,
  } = useFriendsChanges();

  const getList = () => {
    switch (tab) {
      case Tab.Friends:
        return (
          <FriendsList
            friends={friends}
            renderControls={friend => (
              <ControlButtonsWrapper>
                <RejectButton
                  onClick={() =>
                    removeFriend({ variables: { friendId: friend.id } })
                  }
                >
                  Remove
                </RejectButton>
              </ControlButtonsWrapper>
            )}
          />
        );
      case Tab.InvitedFriends:
        return (
          <FriendsList
            friends={invitedFriends}
            renderControls={friend => (
              <ControlButtonsWrapper>
                <RejectButton
                  onClick={() =>
                    cancelInvitation({
                      variables: { invitedFriendId: friend.id },
                    })
                  }
                >
                  Cancel
                </RejectButton>
              </ControlButtonsWrapper>
            )}
          />
        );
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
                <RejectButton
                  onClick={() =>
                    rejectInvitation({ variables: { inviterId: friend.id } })
                  }
                >
                  Reject
                </RejectButton>
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
