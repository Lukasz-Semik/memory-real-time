import React from 'react';
import { rem } from 'polished';
import styled from 'styled-components';

import {
  ControlButtonsWrapper,
  RejectButton,
  Spacer,
  SuccessButton,
} from 'src/components/Elements/FriendsList/FriendsList.styled';

const MessageWrapper = styled.div`
  margin-bottom: ${rem(5)};
`;

interface Props {
  message: string;
  confirm: () => void;
  reject: () => void;
}

export const GameInvitationToast = ({ message, confirm, reject }: Props) => {
  return (
    <>
      <MessageWrapper>{message}</MessageWrapper>
      <ControlButtonsWrapper>
        <SuccessButton onClick={confirm}>Play</SuccessButton>
        <Spacer />
        <RejectButton onClick={reject}>Reject</RejectButton>
      </ControlButtonsWrapper>
    </>
  );
};
