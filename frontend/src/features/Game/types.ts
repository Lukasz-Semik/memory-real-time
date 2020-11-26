import { User } from 'src/types/user';

export enum InvitationResponse {
  Invited = 'invited',
  InvitationConfirmed = 'invitationConfirmed',
  InvitationRejected = 'invitationRejected',
}

export interface GameState {
  gameId: string;
  invitationResponse: InvitationResponse;
  oponent: User;
  creator: User;
  message: string;
}
