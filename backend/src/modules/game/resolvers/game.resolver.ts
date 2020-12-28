import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import { PubSub } from 'graphql-subscriptions';
import { CurrentUserId } from 'src/decorators/current-user-id.decorator';

import { GameEntity } from 'src/entities/game.entity';

import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { GameChangedDataDto, GameDto } from '../dto/game';
import { GameService } from '../services/game.service';

const pubSub = new PubSub();
@Resolver(() => GameEntity)
export class GameResolver {
  constructor(private readonly gameService: GameService) {}

  @Query(() => GameDto)
  @UseGuards(JwtAuthGuard)
  async getGame(
    @Args('gameId') gameId: string,
    @CurrentUserId() userId: string
  ) {
    const gameData = await this.gameService.getGameData(gameId, userId);

    return { gameData };
  }

  @Mutation(() => GameChangedDataDto)
  @UseGuards(JwtAuthGuard)
  async markTile(
    @Args('gameId') gameId: string,
    @Args('tileId') tileId: string,
    @CurrentUserId() userId: string
  ) {
    const markTileResult = await this.gameService.markTile(
      gameId,
      tileId,
      userId
    );

    pubSub.publish('gameChanged', {
      gameChanged: markTileResult,
    });

    return markTileResult;
  }

  @Subscription(() => GameChangedDataDto, {
    nullable: true,
    filter(this: any, payload: { gameChanged: GameChangedDataDto }, variables) {
      const { userId, gameId: subscribedGameId } = variables;
      const { gameData, notifiedPlayer } = payload.gameChanged;

      if (gameData.id !== subscribedGameId) {
        return false;
      }

      return userId === gameData[notifiedPlayer].id;
    },
  })
  gameChanged(@Args('userId') userId: string, @Args('gameId') gameId: string) {
    return pubSub.asyncIterator('gameChanged');
  }
}
