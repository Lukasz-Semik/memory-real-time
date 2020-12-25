import { InvitationResponse, Player } from 'global-types';

import { User } from 'src/types/user';

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
