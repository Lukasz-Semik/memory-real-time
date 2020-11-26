import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { GameEntity } from 'src/entities/game.entity';
import { UserEntity } from 'src/entities/user.entity';

import { AuthModule } from '../auth/auth.module';
import { GameResolver } from './game.resolver';
import { GameService } from './game.service';

@Module({
  imports: [AuthModule, TypeOrmModule.forFeature([UserEntity, GameEntity])],
  providers: [GameResolver, GameService],
})
export class GameModule {}
