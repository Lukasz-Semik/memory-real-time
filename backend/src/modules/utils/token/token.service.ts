import { Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { omitBy } from 'lodash';

import { EnvService } from '../env/env.service';
import { TokenExpiration } from './token.constants';

interface TokenPayload {
  email: string;
  id?: string;
}

@Injectable()
export class TokenService {
  private secret = this.envService.get<string>('APP_SECRET');

  constructor(private envService: EnvService) {}

  async create(
    payloadRaw: TokenPayload,
    expiresIn: TokenExpiration = TokenExpiration.Hours24
  ) {
    const payload = omitBy(payloadRaw, key => !Boolean(key));

    const token = await jwt.sign(payload, this.secret, {
      expiresIn,
      algorithm: 'HS256',
    });

    return token;
  }

  decode(
    token: string
  ): Promise<{
    email: string;
    id: string;
    iat: number;
    exp: number;
  }> {
    return new Promise((resolve, reject) => {
      jwt.verify(token, this.secret, (err, decoded) => {
        if (err) {
          return reject(err);
        }

        // eslint-disable-next-line
        // @ts-ignore
        resolve(decoded);
      });
    });
  }
}
