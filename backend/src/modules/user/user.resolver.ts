import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CurrentUserId } from 'src/decorators/current-user-id.decorator';

import { UserEntity } from 'src/entities/user.entity';

import { AuthService } from '../auth/auth.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { LoginDto } from './dto/login.dto';
import { CurrentUserDto, UserDto } from './dto/user.dto';
import { CreateUserInput } from './inputs';
import { UserService } from './user.service';

@Resolver(() => UserEntity)
export class UserResolver {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService
  ) {}

  @Query(() => CurrentUserDto)
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
}
