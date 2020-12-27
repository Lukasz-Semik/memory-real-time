import { defaultTiles, Player, PlayerData, Tiles } from 'global-types';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

const defaultPlayerData: PlayerData = {
  id: '',
  email: '',
  nick: '',
};

@Entity('game')
export class GameEntity {
  @PrimaryGeneratedColumn('uuid') id: string;

  @Column({ type: 'simple-json', default: defaultPlayerData })
  creator: PlayerData;

  @Column({ type: 'simple-json', default: defaultPlayerData })
  oponent: PlayerData;

  @Column({ type: 'int', default: 0 })
  roundCount: number;

  @Column({ type: 'varchar', length: 255, nullable: true })
  currentPlayer: Player;

  @Column({ type: 'int', default: 0 })
  creatorScore: number;

  @Column({ type: 'int', default: 0 })
  oponentScore: number;

  @Column({ type: 'varchar', length: 255, nullable: true })
  firstTileShot: string;

  @Column({
    type: 'simple-json',
    default: defaultTiles,
  })
  tiles: Tiles;

  @CreateDateColumn({
    type: 'timestamp',
  })
  createdAt: string;
}
