import React, { useContext, useEffect, useState } from 'react';
import { gql, useMutation } from '@apollo/client';
import { rem } from 'polished';
import styled from 'styled-components';

import { styles } from 'src/styles';
import { NotificationsContext } from 'src/features/Dashboard/Notifications/Notifications';
import {
  notifyError,
  notifySuccess,
} from 'src/components/Elements/ToastElement';

const INVITE_FRIEND = gql`
  mutation inviteFriend($email: String!) {
    inviteFriend(email: $email) {
      inviters {
        nick
        email
        id
      }
      invitedFriends {
        nick
        email
        id
      }
      friends {
        nick
        email
        id
      }
    }
  }
`;

const Form = styled.form`
  display: inline-flex;
  align-items: center;
  margin-left: ${rem(20)};
  margin-bottom: ${rem(30)};
  background-color: ${styles.colors.mainGreen};
  border: 1px solid rgba(0, 0, 0, 0.3);
  box-shadow: 3px 3px 15px rgba(0, 0, 0, 0.3);
`;

const Input = styled.input`
  display: block;
  height: 100%;
  border: none;
  width: ${rem(250)};
  background-color: #aaa;
  padding: ${rem(10)} ${rem(10)};
  font-size: ${rem(20)};
  outline: none;
`;

const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  padding: 0 ${rem(20)};
`;

export const InviteFriendForm = () => {
  const [email, setEmail] = useState<string>('');
  const [invite, { data }] = useMutation(INVITE_FRIEND);
  const { setFriendsState } = useContext(NotificationsContext);

  const friendsAfterInvitation = data?.inviteFriend;

  useEffect(() => {
    if (friendsAfterInvitation) {
      setFriendsState(friendsAfterInvitation);
    }
  }, [friendsAfterInvitation, setFriendsState]);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (email) {
      try {
        await invite({ variables: { email } });
        notifySuccess('User has been invited successfully');
        setEmail('');
      } catch (err) {
        notifyError();
      }
    }
  };

  return (
    <Form onSubmit={onSubmit}>
      <Input
        value={email}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setEmail(e.target.value)
        }
      />
      <Button>Invite</Button>
    </Form>
  );
};
