import { Field, ObjectType } from '@nestjs/graphql';

import { UserDto } from '../../user/dto/user.dto';

@ObjectType()
export class FriendsDataDto {
  @Field(type => [UserDto], { nullable: true }) readonly inviters:
    | UserDto[]
    | null;
  @Field(type => [UserDto], { nullable: true }) readonly friends:
    | UserDto[]
    | null;
  @Field(type => [UserDto], { nullable: true })
  readonly invitedFriends: UserDto[] | null;
}

@ObjectType()
export class FriendsDataChangedDto {
  @Field({ nullable: true }) readonly aimedUserId: string | null;
  @Field({ nullable: true }) readonly message: string | null;
  @Field(type => [UserDto], { nullable: true }) readonly inviters:
    | UserDto[]
    | null;
  @Field(type => [UserDto], { nullable: true }) readonly friends:
    | UserDto[]
    | null;
  @Field(type => [UserDto], { nullable: true }) readonly invitedFriends:
    | UserDto[]
    | null;
}
