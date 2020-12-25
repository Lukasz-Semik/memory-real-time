import { Field, ObjectType } from '@nestjs/graphql';
import { InvitationResponse, Player } from 'global-types';

import { UserDto } from 'src/modules/user/dto/user.dto';

@ObjectType()
export class BoardDto {
  @Field(type => String) readonly id: string;
  @Field(type => String) readonly name: string;
  @Field(type => Boolean, { nullable: true }) readonly markedBy: boolean;
}
@ObjectType()
export class GameDataDto {
  @Field(type => String) readonly gameId: string;
  @Field(type => UserDto) readonly oponent: UserDto;
  @Field(type => UserDto) readonly creator: UserDto;
  @Field(type => Number) readonly roundCount: number;
  @Field(type => String) readonly currentPlayer: Player;
  @Field(type => Number) readonly creatorScore: number;
  @Field(type => Number) readonly oponentScore: number;
  @Field(type => [BoardDto]) readonly tiles: BoardDto[];
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
