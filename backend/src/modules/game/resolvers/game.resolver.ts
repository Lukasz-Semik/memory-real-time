import { UseGuards } from '@nestjs/common';
import { Args, Query, Resolver } from '@nestjs/graphql';
import { CurrentUserId } from 'src/decorators/current-user-id.decorator';

import { GameEntity } from 'src/entities/game.entity';

import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { GameDataDto } from '../dto/game';
import { GameService } from '../services/game.service';

@Resolver(() => GameEntity)
export class GameResolver {
  constructor(private readonly gameService: GameService) {}

  @Query(() => GameDataDto)
  @UseGuards(JwtAuthGuard)
  async getGame(
    @Args('gameId') gameId: string,
    @CurrentUserId() userId: string
  ) {
    const gameData = await this.gameService.getGameData(gameId, userId);

    return gameData;
  }
}
