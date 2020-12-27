import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { GameEntity } from 'src/entities/game.entity';
import { UserEntity } from 'src/entities/user.entity';
import { throwError } from 'src/helpers/throwError';

@Injectable()
export class GameInvitationService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(GameEntity)
    private readonly gameRepository: Repository<GameEntity>
  ) {}

  async confirmGameInvitation(gameId: string, userId: string) {
    const game = await this.gameRepository.findOne(gameId);

    if (game.oponent.id !== userId) {
      throwError(HttpStatus.BAD_REQUEST, {
        msg: 'user is not the oponent',
      });
    }

    return {
      gameId: game.id,
      creator: game.creator,
      oponent: game.oponent,
    };
  }
}
