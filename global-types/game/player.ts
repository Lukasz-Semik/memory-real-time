export enum PlayerRole {
  Oponent = 'oponent',
  Creator = 'creator',
}

export interface PlayerData {
  id: string;
  email: string;
  nick: string;
}

export interface Score {
  oponent: number;
  creator: number;
}
