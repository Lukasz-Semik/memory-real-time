import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver, Subscription } from '@nestjs/graphql';
import { PubSub } from 'graphql-subscriptions';
import { CurrentUserId } from 'src/decorators/current-user-id.decorator';

import { UserEntity } from 'src/entities/user.entity';

import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { UserDto } from '../user/dto/user.dto';
import { FriendInvitedDto } from './dto/friend-invited.dto';
import { FriendsService } from './friends.service';

const pubSub = new PubSub();

@Resolver(() => UserEntity)
export class FriendsResolver {
  constructor(private readonly friendsService: FriendsService) {}

  @Mutation(() => UserDto)
  @UseGuards(JwtAuthGuard)
  async inviteFriend(
    @Args('email') email: string,
    @CurrentUserId() userId: string
  ) {
    const {
      invitedUser,
      inviter,
    } = await this.friendsService.inviteUserToFriends(email, userId);

    pubSub.publish('friendInvited', {
      friendInvited: {
        invitedUserId: invitedUser.id,
        inviter,
      },
    });

    return invitedUser;
  }

  @Subscription(() => FriendInvitedDto, {
    filter(this: any, payload, variables) {
      return payload.friendInvited.invitedUserId === variables.id;
    },
  })
  friendInvited(@Args('id') id: string) {
    return pubSub.asyncIterator('friendInvited');
  }
}
