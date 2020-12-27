import { Field, ObjectType } from '@nestjs/graphql';
import { InvitationResponse, Player } from 'global-types';

import { UserDto } from 'src/modules/user/dto/user.dto';

@ObjectType()
export class BoardDto {
  @Field(type => String) readonly id: string;
  @Field(type => String) readonly name: string;
  @Field(type => String, { nullable: true }) readonly markedBy: Player;
}
@ObjectType()
export class GameDataDto {
  @Field(type => String) readonly id: string;
  @Field(type => UserDto) readonly oponent: UserDto;
  @Field(type => UserDto) readonly creator: UserDto;
  @Field(type => Number) readonly roundCount: number;
  @Field(type => String) readonly currentPlayer: Player;
  @Field(type => Number) readonly creatorScore: number;
  @Field(type => Number) readonly oponentScore: number;
  @Field(type => String, { nullable: true }) readonly firstTileShot:
    | string
    | null;
  @Field(type => [BoardDto]) readonly tiles: BoardDto[];
}

@ObjectType()
export class GameChangedDataDto {
  @Field(type => GameDataDto) readonly gameData: GameDataDto;
  @Field(type => String) readonly notifiedPlayer: Player;
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
