import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn('uuid') id: string;

  @Column({ unique: true, type: 'varchar', length: 255 })
  email: string;

  @Column({ unique: true, type: 'varchar', length: 255 })
  nick: string;

  @Column({
    type: 'varchar',
    length: 255,
  })
  public password: string;

  @Column({
    type: 'boolean',
    default: false,
  })
  public isVerified: boolean;

  @Column({ type: 'varchar', array: true, nullable: true })
  public friendsIds: string[];

  @Column({ type: 'varchar', array: true, nullable: true })
  public invitedFriendsIds: string[];

  @Column({ type: 'varchar', array: true, nullable: true })
  public invitersIds: string[];

  @CreateDateColumn({
    type: 'timestamp',
  })
  createdAt: string;

  @UpdateDateColumn({
    type: 'timestamp',
  })
  updatedAt: string;
}
