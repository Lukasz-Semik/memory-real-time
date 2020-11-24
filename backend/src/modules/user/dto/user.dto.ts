import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class UserDto {
  @Field() readonly id: string;
  @Field() readonly email: string;
  @Field() readonly nick: string;
}

@ObjectType()
export class CurrentUserDto {
  @Field() readonly id: string;
  @Field() readonly email: string;
  @Field() readonly nick: string;
  @Field(type => [String], { nullable: true }) readonly friendsIds:
    | string[]
    | null;
  @Field(type => [String], { nullable: true }) readonly invitedFriendsIds:
    | string[]
    | null;
  @Field(type => [String], { nullable: true }) readonly invitersIds:
    | string[]
    | null;
}
