import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('game')
export class GameEntity {
  @PrimaryGeneratedColumn('uuid') id: string;

  @Column({ type: 'varchar', length: 255 })
  creatorId: string;

  @Column({ type: 'varchar', length: 255 })
  oponentId: string;

  @CreateDateColumn({
    type: 'timestamp',
  })
  createdAt: string;
}
