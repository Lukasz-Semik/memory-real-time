export enum Player {
  Oponent = 'oponent',
  Creator = 'creator',
}

export interface PlayerData {
  id: string;
  email: string;
  nick: string;
}
