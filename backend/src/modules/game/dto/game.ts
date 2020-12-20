import { Field, ObjectType } from '@nestjs/graphql';

import { UserDto } from 'src/modules/user/dto/user.dto';
import { Player } from 'src/types/player';

@ObjectType()
export class GameDataDto {
  @Field(type => String) readonly gameId: string;
  @Field(type => UserDto) readonly oponent: UserDto;
  @Field(type => UserDto) readonly creator: UserDto;
  @Field(type => Number) readonly roundCount: number;
  @Field(type => String) readonly currentPlayer: Player;
  @Field(type => Number) readonly creatorScore: number;
  @Field(type => Number) readonly oponentScore: number;
}

export enum InvitationResponse {
  Invited = 'invited',
  InvitationConfirmed = 'invitationConfirmed',
  InvitationRejected = 'invitationRejected',
  InvitationCancelled = 'invitationCancelled',
}

@ObjectType()
export class GameInvitationDataDto {
  @Field(type => String) readonly message: string;
  @Field(type => String) readonly gameId: string;
  @Field(type => UserDto) readonly oponent: UserDto;
  @Field(type => UserDto) readonly creator: UserDto;
  @Field(type => String)
  readonly invitationResponse: InvitationResponse;
}
