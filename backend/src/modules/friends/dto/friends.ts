import { Field, ObjectType } from '@nestjs/graphql';

import { UserDto } from '../../user/dto/user.dto';

@ObjectType()
export class FriendsDataDto {
  @Field(type => [UserDto]) readonly inviters: UserDto[];
  @Field(type => [UserDto]) readonly friends: UserDto[];
  @Field(type => [UserDto]) readonly invitedFriends: UserDto[];
}

@ObjectType()
export class FriendsDataChangedDto {
  @Field() readonly aimedUserId: string;
  @Field() readonly message: string;
  @Field(type => [UserDto]) readonly inviters: UserDto[];
  @Field(type => [UserDto]) readonly friends: UserDto[];
  @Field(type => [UserDto]) readonly invitedFriends: UserDto[];
}
