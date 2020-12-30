import { InvitationResponse, Player, Score, Tiles } from 'global-types';

import { User } from 'src/types/user';

export interface GameState {
  id: string;
  oponent: User;
  creator: User;
  roundCount: number;
  currentPlayer: Player;
  score: Score;
  tiles: Tiles;
}

export interface InvitationData {
  invitationResponse: InvitationResponse;
  message: string;
  gameData: GameState;
}

export type InvitationState = Omit<InvitationData, 'gameData'>;

export interface GameChangedData {
  gameData: GameState;
  notifiedPlayer: Player;
}
