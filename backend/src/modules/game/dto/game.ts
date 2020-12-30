import { Field, ObjectType } from '@nestjs/graphql';
import { InvitationResponse, PlayerRole, Score } from 'global-types';

import { UserDto } from 'src/modules/user/dto/user.dto';

@ObjectType()
export class BoardDto {
  @Field(type => String) readonly id: string;
  @Field(type => String) readonly name: string;
  @Field(type => String, { nullable: true }) readonly markedBy: PlayerRole;
}

@ObjectType()
export class ScoreDto {
  @Field(type => String) readonly oponent: number;
  @Field(type => String) readonly creator: number;
}

@ObjectType()
export class GameDataDto {
  @Field(type => String) readonly id: string;
  @Field(type => UserDto) readonly oponent: UserDto;
  @Field(type => UserDto) readonly creator: UserDto;
  @Field(type => Number) readonly roundCount: number;
  @Field(type => String) readonly currentPlayer: PlayerRole;
  @Field(type => ScoreDto) readonly score: Score;
  @Field(type => String, { nullable: true }) readonly firstTileShot:
    | string
    | null;
  @Field(type => [BoardDto]) readonly tiles: BoardDto[];
}

@ObjectType()
export class GameChangedDataDto {
  @Field(type => GameDataDto) readonly gameData: GameDataDto;
  @Field(type => String) readonly notifiedPlayer: PlayerRole;
}

@ObjectType()
export class GameInvitationDataDto {
  @Field(type => String) readonly message: string;
  @Field(type => String)
  readonly invitationResponse: InvitationResponse;
  @Field(type => GameDataDto) readonly gameData: GameDataDto;
}

@ObjectType()
export class GameDto {
  @Field(type => GameDataDto) readonly gameData: GameDataDto;
}
