import {
  InvitationResponse,
  MatchResult,
  PlayerData,
  PlayerRole,
  Score,
  Tiles,
} from 'global-types';

import { User } from 'src/types/user';

export interface GameState {
  id: string;
  oponent: User;
  creator: User;
  roundCount: number;
  currentPlayer: PlayerRole;
  score: Score;
  tiles: Tiles;
}

export interface PlayerDisplaydData extends Omit<PlayerData, 'email'> {
  role: PlayerRole;
  score: number;
  isPlaying: boolean;
}

export interface PlayersDisplayData {
  currentUserPlayer: PlayerDisplaydData;
  secondPlayer: PlayerDisplaydData;
  currentPlayerNick: string;
}

export interface InvitationData {
  invitationResponse: InvitationResponse;
  message: string;
  gameData: GameState;
}

export type InvitationState = Omit<InvitationData, 'gameData'>;

export interface GameChangedData {
  gameData: GameState;
  notifiedPlayer: PlayerRole;
  matchResult: MatchResult;
  notMatchedTileId: string;
}

export interface BoardInternalState {
  isBoardDisabled: boolean;
  notMatchedTileId: string | null;
  matchResult?: MatchResult;
}
