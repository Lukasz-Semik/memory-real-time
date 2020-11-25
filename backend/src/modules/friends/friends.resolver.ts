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
    const currentUserNick = await this.friendsService.acceptInvitation(
      userId,
      inviterId
    );
    const currentUserFriendsData = await this.friendsService.getFriendsData(
      userId
    );
    const inviterUserFriendsData = await this.friendsService.getFriendsData(
      inviterId
    );

    pubSub.publish('friendsDataChanged', {
      friendsDataChanged: {
        aimedUserId: inviterId,
        message: `User ${currentUserNick} has accepted your invitation`,
        ...inviterUserFriendsData,
      },
    });

    return currentUserFriendsData;
  }

  @Mutation(() => FriendsDataDto)
  @UseGuards(JwtAuthGuard)
  async rejectInvitation(
    @Args('inviterId') inviterId: string,
    @CurrentUserId() userId: string
  ) {
    const currentUserNick = await this.friendsService.rejectInvitation(
      userId,
      inviterId
    );
    const currentUserFriendsData = await this.friendsService.getFriendsData(
      userId
    );
    const inviterFriendsData = await this.friendsService.getFriendsData(
      inviterId
    );

    pubSub.publish('friendsDataChanged', {
      friendsDataChanged: {
        aimedUserId: inviterId,
        message: `User ${currentUserNick} has rejected your invitation`,
        ...inviterFriendsData,
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
    const {
      invitedUser,
      currentUserNick,
    } = await this.friendsService.inviteUserToFriends(email, userId);
    const invitedUserFriendsData = await this.friendsService.getFriendsData(
      invitedUser.id
    );
    const currentUserFriendsData = await this.friendsService.getFriendsData(
      userId
    );

    pubSub.publish('friendsDataChanged', {
      friendsDataChanged: {
        aimedUserId: invitedUser.id,
        message: `You have been invited to friends by ${currentUserNick}`,
        ...invitedUserFriendsData,
      },
    });

    return currentUserFriendsData;
  }

  @Mutation(() => FriendsDataDto)
  @UseGuards(JwtAuthGuard)
  async removeFriend(
    @Args('friendId') friendId: string,
    @CurrentUserId() userId: string
  ) {
    const currentUserNick = await this.friendsService.removeFriend(
      friendId,
      userId
    );
    const friendUserFriendsData = await this.friendsService.getFriendsData(
      friendId
    );
    const currentUserFriendsData = await this.friendsService.getFriendsData(
      userId
    );

    pubSub.publish('friendsDataChanged', {
      friendsDataChanged: {
        aimedUserId: friendId,
        message: `You have been removed from ${currentUserNick}'s friends`,
        ...friendUserFriendsData,
      },
    });

    return currentUserFriendsData;
  }

  @Mutation(() => FriendsDataDto)
  @UseGuards(JwtAuthGuard)
  async cancelInvitation(
    @Args('invitedFriendId') invitedFriendId: string,
    @CurrentUserId() userId: string
  ) {
    const currentUserNick = await this.friendsService.cancelInvitation(
      invitedFriendId,
      userId
    );

    const invitedFriendUserFriendsData = await this.friendsService.getFriendsData(
      invitedFriendId
    );
    const currentUserFriendsData = await this.friendsService.getFriendsData(
      userId
    );

    pubSub.publish('friendsDataChanged', {
      friendsDataChanged: {
        aimedUserId: invitedFriendId,
        message: `Your invitation from ${currentUserNick} has been cancelled`,
        ...invitedFriendUserFriendsData,
      },
    });

    return currentUserFriendsData;
  }

  @Subscription(() => FriendsDataChangedDto, {
    nullable: true,
    filter(this: any, payload, variables) {
      return payload.friendsDataChanged.aimedUserId === variables.id;
    },
  })
  friendsDataChanged(@Args('id') id: string) {
    return pubSub.asyncIterator('friendsDataChanged');
  }
}
