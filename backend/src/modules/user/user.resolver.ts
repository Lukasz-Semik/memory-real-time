import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import { PubSub } from 'graphql-subscriptions';
import { CurrentUserId } from 'src/decorators/current-user-id.decorator';

import { UserEntity } from 'src/entities/user.entity';

import { AuthService } from '../auth/auth.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { LoginDto } from './dto/login.dto';
import { UserDto } from './dto/user.dto';
import { CreateUserInput } from './inputs';
import { UserService } from './user.service';

const pubSub = new PubSub();

@Resolver(() => UserEntity)
export class UserResolver {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService
  ) {}

  @Query(() => UserDto)
  @UseGuards(JwtAuthGuard)
  async me(@CurrentUserId() userId: string) {
    const user = await this.userService.getUser(userId);

    return user;
  }

  @Mutation(() => LoginDto)
  async login(
    @Args('email') email: string,
    @Args('password') password: string
  ) {
    const accessToken = await this.authService.login(email, password);

    return accessToken;
  }

  @Mutation(() => UserDto)
  async createUser(@Args('data') data: CreateUserInput) {
    return this.userService.createUser(data);
  }

  @Mutation(() => UserDto)
  async confirmUser(@Args('token') token: string) {
    return this.userService.confirmUser(token);
  }

  @Mutation(() => Boolean)
  @UseGuards(JwtAuthGuard)
  async inviteFriend(
    @Args('email') email: string,
    @CurrentUserId() userId: string
  ) {
    const newInvetersIds = await this.userService.inviteUserToFriends(
      email,
      userId
    );

    pubSub.publish('friendInvited', { friendInvited: newInvetersIds });

    return true;
  }

  @Subscription(() => [String])
  friendInvited() {
    return pubSub.asyncIterator('friendInvited');
  }
}
