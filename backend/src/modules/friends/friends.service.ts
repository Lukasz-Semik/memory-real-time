import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { isEmpty } from 'lodash';
import { Repository } from 'typeorm';

import { UserEntity } from 'src/entities/user.entity';
import { throwError } from 'src/helpers/throwError';

import { UserDto } from '../user/dto/user.dto';

enum FriendsKey {
  FriendsIds = 'friendsIds',
  InvitedFriendsIds = 'invitedFriendsIds',
  InvitersIds = 'invitersIds',
}
@Injectable()
export class FriendsService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>
  ) {}

  private async friendsQuery(currentUser: UserEntity, key: FriendsKey) {
    if (isEmpty(currentUser[key])) {
      return [];
    }

    const friends = await this.userRepository
      .createQueryBuilder('user')
      .take()
      .where('user.id IN (:...ids)', { ids: currentUser[key] })
      .execute();

    return friends.map(friend => ({
      id: friend.user_id,
      nick: friend.user_nick,
      email: friend.user_email,
    })) as UserDto[];
  }

  async getFriendsData(userId: string) {
    const currentUser = await this.userRepository.findOne(userId);

    if (!currentUser) {
      throwError(HttpStatus.NOT_FOUND, { msg: 'user not exists' });
    }

    const friends = await this.friendsQuery(currentUser, FriendsKey.FriendsIds);
    const invitedFriends = await this.friendsQuery(
      currentUser,
      FriendsKey.InvitedFriendsIds
    );
    const inviters = await this.friendsQuery(
      currentUser,
      FriendsKey.InvitersIds
    );

    return {
      friends,
      invitedFriends,
      inviters,
    };
  }

  async acceptInvitation(userId: string, inviterId: string) {
    const currentUser = await this.userRepository.findOne(userId);

    if (!currentUser) {
      throwError(HttpStatus.NOT_FOUND, { msg: 'user not exists' });
    }

    const inviter = await this.userRepository.findOne(inviterId);

    if (!inviter) {
      throwError(HttpStatus.NOT_FOUND, { msg: 'user not exists' });
    }

    await this.userRepository.save({
      ...currentUser,
      friendsIds: [...(currentUser.friendsIds || []), inviterId],
      invitersIds: (currentUser.invitersIds || []).filter(
        id => id !== inviterId
      ),
    });

    await this.userRepository.save({
      ...inviter,
      invitedFriendsIds: (inviter.invitedFriendsIds || []).filter(
        id => id !== userId
      ),
      friendsIds: [...(inviter.friendsIds || []), userId],
    });
  }

  async inviteUserToFriends(email: string, currentUserId: string) {
    const invitedUser = await this.userRepository.findOne({ email });

    if (!invitedUser) {
      throwError(HttpStatus.NOT_FOUND, { msg: 'user not exists' });
    }

    if (currentUserId === invitedUser.id) {
      throwError(HttpStatus.BAD_REQUEST, {
        msg: 'user cannot invite himself ',
      });
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

    return invitedUser;
  }
}
