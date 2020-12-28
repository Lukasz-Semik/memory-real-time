import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver, Subscription } from '@nestjs/graphql';
import { InvitationResponse } from 'global-types';
import { PubSub } from 'graphql-subscriptions';
import { CurrentUserId } from 'src/decorators/current-user-id.decorator';

import { GameEntity } from 'src/entities/game.entity';

import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { GameDto, GameInvitationDataDto } from '../dto/game';
import { GameInvitationService } from '../services/game-invitation.service';
import { GameService } from '../services/game.service';

const pubSub = new PubSub();

@Resolver(() => GameEntity)
export class GameInvitationResolver {
  constructor(
    private readonly gameService: GameService,
    private readonly gameInvitationService: GameInvitationService
  ) {}

  @Mutation(() => GameDto)
  @UseGuards(JwtAuthGuard)
  async createGame(
    @Args('oponentId') oponentId: string,
    @CurrentUserId() userId: string
  ) {
    const gameData = await this.gameService.createGame(oponentId, userId);

    pubSub.publish('gameInvitation', {
      gameInvitation: {
        invitationResponse: InvitationResponse.Invited,
        message: `Wanna play with ${gameData.creator.nick}?`,
        gameData,
      },
    });

    return { gameData };
  }

  @Mutation(() => Boolean)
  @UseGuards(JwtAuthGuard)
  async confirmGameInvitation(
    @Args('gameId') gameId: string,
    @CurrentUserId() userId: string
  ) {
    const gameData = await this.gameInvitationService.confirmGameInvitation(
      gameId,
      userId
    );

    pubSub.publish('gameInvitation', {
      gameInvitation: {
        invitationResponse: InvitationResponse.InvitationConfirmed,
        message: `${gameData.oponent.nick} accepted game invitation`,
        gameData,
      },
    });

    return true;
  }

  @Mutation(() => Boolean)
  @UseGuards(JwtAuthGuard)
  async rejectGameInvitation(@Args('gameId') gameId: string) {
    const gameData = await this.gameService.deleteGame(gameId);

    pubSub.publish('gameInvitation', {
      gameInvitation: {
        invitationResponse: InvitationResponse.InvitationRejected,
        message: `${gameData.oponent.nick} rejected game invitation`,
        gameData,
      },
    });

    return true;
  }

  @Mutation(() => Boolean)
  @UseGuards(JwtAuthGuard)
  async cancelGameInvitation(@Args('gameId') gameId: string) {
    const gameData = await this.gameService.deleteGame(gameId);

    pubSub.publish('gameInvitation', {
      gameInvitation: {
        invitationResponse: InvitationResponse.InvitationCancelled,
        message: `${gameData.creator.nick} rejected game invitation`,
        gameData,
      },
    });

    return true;
  }

  @Subscription(() => GameInvitationDataDto, {
    nullable: true,
    filter(this: any, payload, variables) {
      const { invitationResponse, gameData } = payload.gameInvitation;
      const { oponent, creator } = gameData;
      if (
        [
          InvitationResponse.InvitationRejected,
          InvitationResponse.InvitationCancelled,
        ].includes(invitationResponse)
      ) {
        return oponent.id === variables.id || creator.id === variables.id;
      }
      if (invitationResponse === InvitationResponse.Invited) {
        return oponent.id === variables.id;
      }

      if (invitationResponse === InvitationResponse.InvitationConfirmed) {
        return creator.id === variables.id;
      }

      return false;
    },
  })
  gameInvitation(@Args('id') id: string) {
    return pubSub.asyncIterator('gameInvitation');
  }
}
