import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import { Player } from 'global-types';
import { PubSub } from 'graphql-subscriptions';
import { CurrentUserId } from 'src/decorators/current-user-id.decorator';

import { GameEntity } from 'src/entities/game.entity';

import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { GameChangedDataDto, GameDataDto } from '../dto/game';
import { GameService } from '../services/game.service';

const pubSub = new PubSub();
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
    console.log({ markTileResult });
    pubSub.publish('gameChanged', {
      gameChanged: {
        gameId,
      },
    });

    return markTileResult;
  }

  @Subscription(() => GameChangedDataDto, {
    nullable: true,
    filter(this: any, payload: { gameChanged: GameDataDto }, variables) {
      // first shot -> notify next player
      // second shot -> notify "new" currentPlayer
      const { userId, gameId: subscribedGameId } = variables;
      const {
        id,
        currentPlayer,
        creator,
        oponent,
        firstTileShot,
      } = payload.gameChanged;

      if (id !== subscribedGameId) {
        return false;
      }

      if (firstTileShot) {
      }
      return currentPlayer === Player.Creator
        ? userId === oponent.id
        : userId === creator.id;
    },
  })
  gameChanged(@Args('userId') userId: string, @Args('gameId') gameId: string) {
    return pubSub.asyncIterator('gameChanged');
  }
}
