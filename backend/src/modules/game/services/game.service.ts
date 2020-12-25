import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { defaultTiles, Player } from 'global-types';
import { random, shuffle } from 'lodash';
import { Repository } from 'typeorm';

import { GameEntity } from 'src/entities/game.entity';
import { UserEntity } from 'src/entities/user.entity';
import { throwError } from 'src/helpers/throwError';

@Injectable()
export class GameService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(GameEntity)
    private readonly gameRepository: Repository<GameEntity>
  ) {}

  async getGameData(gameId: string, userId: string) {
    const game = await this.gameRepository.findOne(gameId);

    if (![game.oponentId, game.creatorId].includes(userId)) {
      throwError(HttpStatus.BAD_REQUEST, {
        msg: 'user does not belong to this game',
      });
    }

    const creator = await this.userRepository.findOne(game.creatorId);
    const oponent = await this.userRepository.findOne(game.oponentId);
    console.log({ game });
    return {
      gameId: game.id,
      roundCount: game.roundCount,
      currentPlayer: game.currentPlayer,
      creatorScore: game.creatorScore,
      oponentScore: game.oponentScore,
      tiles: game.tiles,
      creator: {
        id: creator.id,
        nick: creator.nick,
        email: creator.email,
      },
      oponent: {
        id: oponent.id,
        nick: oponent.nick,
        email: oponent.email,
      },
    };
  }

  async createGame(oponentId: string, userId: string) {
    const currentUser = await this.userRepository.findOne(userId);

    if (!currentUser) {
      throwError(HttpStatus.NOT_FOUND, { msg: 'user not exists' });
    }

    if (!(currentUser.friendsIds || []).includes(oponentId)) {
      throwError(HttpStatus.BAD_REQUEST, {
        msg: 'invited user is not a friend',
      });
    }

    const oponent = await this.userRepository.findOne(oponentId);

    const newGame = new GameEntity();

    const createdGame = await this.gameRepository.save({
      ...newGame,
      currentPlayer: [Player.Creator, Player.Oponent][random(0, 1)],
      tiles: shuffle(defaultTiles),
      oponentId,
      creatorId: userId,
    });

    return {
      gameId: createdGame.id,
      creator: {
        id: currentUser.id,
        nick: currentUser.nick,
        email: currentUser.email,
      },
      oponent: {
        id: oponent.id,
        nick: oponent.nick,
        email: oponent.email,
      },
    };
  }

  async deleteGame(gameId: string) {
    const game = await this.gameRepository.findOne(gameId);
    const creator = await this.userRepository.findOne(game.creatorId);
    const oponent = await this.userRepository.findOne(game.oponentId);

    await this.gameRepository.delete(game.id);

    return {
      gameId: game.id,
      creator: {
        id: creator.id,
        nick: creator.nick,
        email: creator.email,
      },
      oponent: {
        id: oponent.id,
        nick: oponent.nick,
        email: oponent.email,
      },
    };
  }
}
