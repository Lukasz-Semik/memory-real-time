import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { defaultTiles, Player } from 'global-types';
import { random, shuffle, findIndex } from 'lodash';
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

    if (![game.oponent.id, game.creator.id].includes(userId)) {
      throwError(HttpStatus.BAD_REQUEST, {
        msg: 'user does not belong to this game',
      });
    }
    return {
      ...game,
      tiles: game.tiles,
      creator: game.creator,
      oponent: game.oponent,
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

    return {
      gameId: createdGame.id,
      creator: createdGame.creator,
      oponent: createdGame.oponent,
    };
  }

  async deleteGame(gameId: string) {
    const game = await this.gameRepository.findOne(gameId);

    await this.gameRepository.delete(game.id);

    return {
      id: game.id,
      creator: game.creator,
      oponent: game.oponent,
    };
  }

  async markTile(gameId: string, tileId: string, userId: string) {
    const game = await this.gameRepository.findOne(gameId);
    // first shot -> notify next player, mark tile, mark firstShot
    // second shot -> notify "new" currentPlayer
    const { oponent, creator, tiles, firstTileShot, currentPlayer } = game;

    const newTiles = [...tiles];
    const nextTile = newTiles.find(tile => tile.id === tileId);

    if (!nextTile) {
      throwError(HttpStatus.BAD_REQUEST, { msg: 'tile does not exists' });
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
        notifiedPlayer:
          currentPlayer === Player.Creator ? Player.Oponent : Player.Creator,
        gameData: savedGame,
      };
    }

    const previousTile = newTiles.find(tile => tile.id === firstTileShot);
    console.log({ previousTile, firstTileShot });
    if (previousTile.name !== nextTile.name) {
      previousTile.markedBy = null;

      const savedGame = await this.gameRepository.save({
        ...game,
        creator,
        oponent,
        tiles: newTiles,
        firstTileShot: null,
        roundCount: game.roundCount + 1,
        currentPlayer:
          currentPlayer === Player.Creator ? Player.Oponent : Player.Creator,
      });
      console.log({ savedGame });
      return {
        notifiedPlayer: savedGame.currentPlayer,
        gameData: savedGame,
      };
    }

    // const previoustTileIndex = findIndex(tiles, tile => tile.id === firstTileShot)

    // const previousTile = tiles.find(tile => tile.id === firstTileShot);
    // const nextTile = tiles.find(tile => tile.id === tileId);

    // if (previousTile.name !== nextTile.name) {

    // }

    // return {
    //   notifiedPlayer: Player.Creator,
    //   gameData: game,
    // };
  }
}
