import React from 'react';
import { rem } from 'polished';

import { ModalElement } from 'src/components/Elements/ModalElement/ModalElement';

import { GameStarterLoader } from '../GameStarterLoader/GameStarterLoader';

interface Props {
  invitedFriendNick: string;
  closeModal: () => void;
}

export const GameWaitingModal = ({ invitedFriendNick, closeModal }: Props) => {
  return (
    <ModalElement
      minWidth={rem(590)}
      title={`Waiting for ${invitedFriendNick} acceptation`}
      close={closeModal}
      isCancelButtonHidden
      isOpen
    >
      <GameStarterLoader />

      <button>Reject</button>
    </ModalElement>
  );
};
