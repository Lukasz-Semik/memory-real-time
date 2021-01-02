import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { defaultTiles, MatchResult, PlayerRole } from 'global-types';
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

  private switchPlayers = (currentPlayer: PlayerRole) =>
    currentPlayer === PlayerRole.Creator
      ? PlayerRole.Oponent
      : PlayerRole.Creator;

  async getGameData(gameId: string, userId: string) {
    const game = await this.gameRepository.findOne(gameId);

    if (![game.oponent.id, game.creator.id].includes(userId)) {
      throwError(HttpStatus.BAD_REQUEST, {
        msg: 'user does not belong to this game',
      });
    }
    return game;
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
      currentPlayer: [PlayerRole.Creator, PlayerRole.Oponent][random(0, 1)],
      tiles: shuffle(defaultTiles),
      oponent: {
        id: oponent.id,
        email: oponent.email,
        nick: oponent.nick,
      },
      creator: {
        id: currentUser.id,
        email: currentUser.email,
        nick: currentUser.nick,
      },
    });

    return createdGame;
  }

  async deleteGame(gameId: string) {
    const game = await this.gameRepository.findOne(gameId);

    await this.gameRepository.delete(game.id);

    return game;
  }

  async markTile(gameId: string, tileId: string, userId: string) {
    const game = await this.gameRepository.findOne(gameId);

    if (!game) {
      throwError(HttpStatus.NOT_FOUND, { msg: 'game does not exist' });
    }
    const { oponent, creator, tiles, firstTileShot, currentPlayer } = game;

    if (game[currentPlayer].id !== userId) {
      throwError(HttpStatus.CONFLICT, { msg: 'user is not a current player' });
    }

    const newTiles = [...tiles];
    const nextTile = newTiles.find(tile => tile.id === tileId);

    if (!nextTile) {
      throwError(HttpStatus.BAD_REQUEST, { msg: 'tile does not exist' });
    }

    if (!firstTileShot) {
      nextTile.markedBy = currentPlayer;

      const savedGame = await this.gameRepository.save({
        ...game,
        creator,
        oponent,
        tiles: newTiles,
        firstTileShot: tileId,
      });

      return {
        notMatchedTileId: null,
        matchResult: MatchResult.FirstShot,
        notifiedPlayer:
          currentPlayer === PlayerRole.Creator
            ? PlayerRole.Oponent
            : PlayerRole.Creator,
        gameData: savedGame,
      };
    }

    const previousTile = newTiles.find(tile => tile.id === firstTileShot);

    if (previousTile.name !== nextTile.name) {
      previousTile.markedBy = null;

      const savedGame = await this.gameRepository.save({
        ...game,
        creator,
        oponent,
        tiles: newTiles,
        firstTileShot: null,
        roundCount: game.roundCount + 1,
        currentPlayer: this.switchPlayers(currentPlayer),
      });

      return {
        notMatchedTileId: tileId,
        matchResult: MatchResult.NotMatched,
        notifiedPlayer: savedGame.currentPlayer,
        gameData: savedGame,
      };
    }

    const isGameOver = newTiles.filter(tile => !tile.markedBy).length === 1;

    const currentPlayerScore = game.score[currentPlayer];

    nextTile.markedBy = currentPlayer;

    const savedGame = await this.gameRepository.save({
      ...game,
      creator,
      oponent,
      tiles: newTiles,
      firstTileShot: null,
      roundCount: game.roundCount + 1,
      isGameOver,
      score: {
        ...game.score,
        [currentPlayer]: currentPlayerScore + 1,
      },
      currentPlayer: this.switchPlayers(currentPlayer),
    });

    return {
      notMatchedTileId: null,
      matchResult: MatchResult.Matched,
      notifiedPlayer: savedGame.currentPlayer,
      gameData: savedGame,
    };
  }
}
