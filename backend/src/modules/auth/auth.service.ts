import { HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { compare } from 'bcryptjs';
import { Repository } from 'typeorm';

import { UserEntity } from 'src/entities/user.entity';
import { throwError } from 'src/helpers/throwError';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly jwtService: JwtService
  ) {}

  async validateUser(email: string, pass: string): Promise<UserEntity> {
    const user = await this.userRepository.findOne({ email });

    if (!user || !user.isVerified) {
      return null;
    }

    const isMatch = await compare(pass, user.password);

    if (isMatch) {
      return user;
    }

    return null;
  }

  async login(email, password) {
    const user = await this.validateUser(email, password);

    if (!user) {
      throwError(HttpStatus.UNAUTHORIZED, {});
    }

    const payload = { email: user.email, sub: user.id };

    return {
      accessToken: this.jwtService.sign(payload),
    };
  }
}
