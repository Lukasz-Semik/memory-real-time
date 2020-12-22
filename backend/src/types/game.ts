import { Player } from './player';

enum TileName {
  A = 'A',
  B = 'B',
  C = 'C',
  D = 'D',
}

export interface Tile<T = string> {
  name: T;
  markedBy: Player | null;
}

export type Tiles = [
  Tile<TileName.A>,
  Tile<TileName.A>,
  Tile<TileName.B>,
  Tile<TileName.B>,
  Tile<TileName.C>,
  Tile<TileName.C>,
  Tile<TileName.D>,
  Tile<TileName.D>
];

export const defaultTiles: Tiles = [
  {
    name: TileName.A,
    markedBy: null,
  },
  {
    name: TileName.A,
    markedBy: null,
  },
  {
    name: TileName.B,
    markedBy: null,
  },
  {
    name: TileName.B,
    markedBy: null,
  },
  {
    name: TileName.C,
    markedBy: null,
  },
  {
    name: TileName.C,
    markedBy: null,
  },
  {
    name: TileName.D,
    markedBy: null,
  },
  {
    name: TileName.D,
    markedBy: null,
  },
];
