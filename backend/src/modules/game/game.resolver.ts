import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver, Subscription } from '@nestjs/graphql';
import { PubSub } from 'graphql-subscriptions';
import { CurrentUserId } from 'src/decorators/current-user-id.decorator';

import { GameEntity } from 'src/entities/game.entity';

import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import {
  GameDataDto,
  GameInvitationDataDto,
  InvitationResponse,
} from './dto/game';
import { GameService } from './game.service';

const pubSub = new PubSub();

@Resolver(() => GameEntity)
export class GameResolver {
  constructor(private readonly gameService: GameService) {}

  @Mutation(() => GameDataDto)
  @UseGuards(JwtAuthGuard)
  async createGame(
    @Args('oponentId') oponentId: string,
    @CurrentUserId() userId: string
  ) {
    const gameData = await this.gameService.createGame(oponentId, userId);

    pubSub.publish('gameInvitation', {
      gameInvitation: {
        invitationResponse: InvitationResponse.Invited,
        ...gameData,
      },
    });

    return gameData;
  }

  @Mutation(() => Boolean)
  @UseGuards(JwtAuthGuard)
  async confirmGameInvitation(
    @Args('gameId') gameId: string,
    @CurrentUserId() userId: string
  ) {
    const gameData = await this.gameService.confirmGameInvitation(
      gameId,
      userId
    );

    pubSub.publish('gameInvitation', {
      gameInvitation: {
        invitationResponse: InvitationResponse.InvitationConfirmed,
        ...gameData,
      },
    });

    return true;
  }

  @Subscription(() => GameInvitationDataDto, {
    nullable: true,
    filter(this: any, payload, variables) {
      if (
        payload.gameInvitation.invitationResponse === InvitationResponse.Invited
      ) {
        return payload.gameInvitation.oponent.id === variables.id;
      }

      if (
        payload.gameInvitation.invitationResponse ===
        InvitationResponse.InvitationConfirmed
      ) {
        return payload.gameInvitation.creator.id === variables.id;
      }

      return false;
    },
  })
  gameInvitation(@Args('id') id: string) {
    return pubSub.asyncIterator('gameInvitation');
  }
}
