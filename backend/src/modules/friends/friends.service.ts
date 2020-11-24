import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { UserEntity } from 'src/entities/user.entity';
import { throwError } from 'src/helpers/throwError';

@Injectable()
export class FriendsService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>
  ) {}

  async inviteUserToFriends(email: string, currentUserId: string) {
    const invitedUser = await this.userRepository.findOne({ email });

    if (!invitedUser) {
      throwError(HttpStatus.NOT_FOUND, { msg: 'user not exists' });
    }

    const currentUser = await this.userRepository.findOne(currentUserId);

    if ((currentUser.invitedFriendsIds || []).includes(invitedUser.id)) {
      throwError(HttpStatus.BAD_REQUEST, { msg: 'user already invited ' });
    }

    await this.userRepository.save({
      ...currentUser,
      invitedFriendsIds: [
        ...(currentUser.invitedFriendsIds || []),
        invitedUser.id,
      ],
    });

    await this.userRepository.save({
      ...invitedUser,
      invitersIds: [...(invitedUser.invitersIds || []), currentUser.id],
    });

    return {
      invitedUser: {
        id: invitedUser.id,
        nick: invitedUser.nick,
        email: invitedUser.email,
      },
      inviter: {
        id: currentUser.id,
        nick: currentUser.nick,
        email: currentUser.email,
      },
    };
  }
}
