import { Player } from './player';

enum TileName {
  A = 'A',
  B = 'B',
  C = 'C',
  D = 'D',
  E = 'E',
  F = 'F',
  G = 'G',
  H = 'H',
}

export interface Tile<T = string> {
  name: T;
  id: string;
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
  Tile<TileName.D>,
  Tile<TileName.E>,
  Tile<TileName.E>,
  Tile<TileName.F>,
  Tile<TileName.F>,
  Tile<TileName.G>,
  Tile<TileName.G>,
  Tile<TileName.H>,
  Tile<TileName.H>
];

export const defaultTiles: Tiles = [
  {
    id: `${TileName.A}-1`,
    name: TileName.A,
    markedBy: null,
  },
  {
    id: `${TileName.A}-2`,
    name: TileName.A,
    markedBy: null,
  },
  {
    id: `${TileName.B}-1`,
    name: TileName.B,
    markedBy: null,
  },
  {
    id: `${TileName.B}-2`,
    name: TileName.B,
    markedBy: null,
  },
  {
    id: `${TileName.B}-1`,
    name: TileName.C,
    markedBy: null,
  },
  {
    id: `${TileName.C}-2`,
    name: TileName.C,
    markedBy: null,
  },
  {
    id: `${TileName.D}-1`,
    name: TileName.D,
    markedBy: null,
  },
  {
    id: `${TileName.D}-2`,
    name: TileName.D,
    markedBy: null,
  },
  {
    id: `${TileName.E}-1`,
    name: TileName.E,
    markedBy: null,
  },
  {
    id: `${TileName.E}-2`,
    name: TileName.E,
    markedBy: null,
  },
  {
    id: `${TileName.F}-1`,
    name: TileName.F,
    markedBy: null,
  },
  {
    id: `${TileName.F}-2`,
    name: TileName.F,
    markedBy: null,
  },
  {
    id: `${TileName.G}-1`,
    name: TileName.G,
    markedBy: null,
  },
  {
    id: `${TileName.G}-2`,
    name: TileName.G,
    markedBy: null,
  },
  {
    id: `${TileName.H}-1`,
    name: TileName.H,
    markedBy: null,
  },
  {
    id: `${TileName.H}-2`,
    name: TileName.H,
    markedBy: null,
  },
];
