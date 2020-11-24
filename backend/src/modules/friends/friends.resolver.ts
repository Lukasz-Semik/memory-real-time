import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import { PubSub } from 'graphql-subscriptions';
import { CurrentUserId } from 'src/decorators/current-user-id.decorator';

import { UserEntity } from 'src/entities/user.entity';

import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { FriendsDataChangedDto, FriendsDataDto } from './dto/friends';
import { FriendsService } from './friends.service';

const pubSub = new PubSub();

@Resolver(() => UserEntity)
export class FriendsResolver {
  constructor(private readonly friendsService: FriendsService) {}

  @Query(() => FriendsDataDto)
  @UseGuards(JwtAuthGuard)
  async getFriendsData(@CurrentUserId() userId: string) {
    const friendsData = await this.friendsService.getFriendsData(userId);

    return friendsData;
  }

  @Mutation(() => FriendsDataDto)
  @UseGuards(JwtAuthGuard)
  async acceptInvitation(
    @Args('inviterId') inviterId: string,
    @CurrentUserId() userId: string
  ) {
    await this.friendsService.acceptInvitation(userId, inviterId);
    const currentUserFriendsData = await this.friendsService.getFriendsData(
      userId
    );
    const inviterUserFriendsData = await this.friendsService.getFriendsData(
      inviterId
    );

    pubSub.publish('friendsDataChanged', {
      friendsDataChanged: {
        aimedUserId: inviterId,
        message: `User has accepted invitation`,
        ...inviterUserFriendsData,
      },
    });

    return currentUserFriendsData;
  }

  @Mutation(() => FriendsDataDto)
  @UseGuards(JwtAuthGuard)
  async inviteFriend(
    @Args('email') email: string,
    @CurrentUserId() userId: string
  ) {
    const invitedUser = await this.friendsService.inviteUserToFriends(
      email,
      userId
    );
    const invitedUserFriendsData = await this.friendsService.getFriendsData(
      invitedUser.id
    );
    const currentUserFriendsData = await this.friendsService.getFriendsData(
      userId
    );

    pubSub.publish('friendsDataChanged', {
      friendsDataChanged: {
        aimedUserId: invitedUser.id,
        message: `User has been invited to friends`,
        ...invitedUserFriendsData,
      },
    });

    return currentUserFriendsData;
  }

  @Subscription(() => FriendsDataChangedDto, {
    filter(this: any, payload, variables) {
      return payload.friendsDataChanged.aimedUserId === variables.id;
    },
  })
  friendsDataChanged(@Args('id') id: string) {
    return pubSub.asyncIterator('friendsDataChanged');
  }
}
