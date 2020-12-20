import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Player } from 'src/types/player';

@Entity('game')
export class GameEntity {
  @PrimaryGeneratedColumn('uuid') id: string;

  @Column({ type: 'varchar', length: 255 })
  creatorId: string;

  @Column({ type: 'varchar', length: 255 })
  oponentId: string;

  @Column({ type: 'int', default: 0 })
  roundCount: number;

  @Column({ type: 'varchar', length: 255, nullable: true })
  currentPlayer: Player;

  @Column({ type: 'int', default: 0 })
  creatorScore: number;

  @Column({ type: 'int', default: 0 })
  oponentScore: number;

  @CreateDateColumn({
    type: 'timestamp',
  })
  createdAt: string;
}
