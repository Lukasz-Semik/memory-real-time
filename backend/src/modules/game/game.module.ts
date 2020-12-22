import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { GameEntity } from 'src/entities/game.entity';
import { UserEntity } from 'src/entities/user.entity';

import { AuthModule } from '../auth/auth.module';
import { GameInvitationResolver } from './resolvers/game-invitation.resolver';
import { GameResolver } from './resolvers/game.resolver';
import { GameInvitationService } from './services/game-invitation.service';
import { GameService } from './services/game.service';

@Module({
  imports: [AuthModule, TypeOrmModule.forFeature([UserEntity, GameEntity])],
  providers: [
    GameResolver,
    GameInvitationResolver,
    GameService,
    GameInvitationService,
  ],
})
export class GameModule {}
