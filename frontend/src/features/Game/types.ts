import { User } from 'src/types/user';

export enum Player {
  Oponent = 'oponent',
  Creator = 'creator',
}

export enum InvitationResponse {
  Invited = 'invited',
  InvitationConfirmed = 'invitationConfirmed',
  InvitationRejected = 'invitationRejected',
  InvitationCancelled = 'invitationCancelled',
}
export interface GameState {
  gameId: string;
  invitationResponse: InvitationResponse;
  oponent: User;
  creator: User;
  message: string;
  roundCount: number;
  currentPlayer: Player;
  creatorScore: number;
  oponentScore: number;
}
