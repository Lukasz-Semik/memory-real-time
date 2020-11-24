import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { hash } from 'bcryptjs';
import { isEmpty, omit } from 'lodash';
import { Repository } from 'typeorm';

import { UserEntity } from 'src/entities/user.entity';
import { throwError } from 'src/helpers/throwError';

import { MailsService } from '../utils/mails/mails.service';
import { TokenExpiration } from '../utils/token/token.constants';
import { TokenService } from '../utils/token/token.service';
import { UserDto } from './dto/user.dto';
import { CreateUserInput } from './inputs';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private mailsService: MailsService,
    private tokenService: TokenService
  ) {}

  async getUser(id: string): Promise<UserDto | undefined> {
    try {
      const user = await this.userRepository.findOne(id);

      if (!user) {
        throwError(HttpStatus.NOT_FOUND, { msg: 'email not exists' });
      }

      return user;
    } catch (err) {
      throwError(HttpStatus.INTERNAL_SERVER_ERROR, err);
    }
  }

  async createUser(data: CreateUserInput): Promise<UserDto> {
    try {
      const newUser = new UserEntity();

      const hashedPassword = await hash(data.password, 10);

      const createdUser = await this.userRepository.save({
        ...newUser,
        ...data,
        password: hashedPassword,
      });

      const token = await this.tokenService.create(
        {
          email: createdUser.email,
          id: createdUser.id,
        },
        TokenExpiration.ExpireWeeks2
      );

      if (!isEmpty(createdUser)) {
        this.mailsService.sendAccountConfirmationEmail(
          createdUser.email,
          createdUser.nick,
          token
        );
      }

      return createdUser;
    } catch (err) {
      throwError(HttpStatus.INTERNAL_SERVER_ERROR, err);
    }
  }

  async confirmUser(token: string): Promise<UserDto> {
    const { email } = await this.tokenService.decode(token);

    const existingUser = await this.userRepository.findOne({ email });

    if (isEmpty(existingUser)) {
      throwError(HttpStatus.NOT_FOUND, { msg: 'email not exists' });
    }

    if (existingUser.isVerified) {
      throwError(HttpStatus.CONFLICT, { msg: 'email already verified' });
    }

    const confirmedUser = await this.userRepository.save({
      ...existingUser,
      isVerified: true,
    });

    return omit(confirmedUser, 'password');
  }
}
