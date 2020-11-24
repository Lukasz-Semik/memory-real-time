import { Field, ObjectType } from '@nestjs/graphql';

import { UserDto } from '../../user/dto/user.dto';

@ObjectType()
export class FriendInvitedDto {
  @Field() readonly invitedUserId: string;
  @Field(type => UserDto) readonly inviter: UserDto;
}
