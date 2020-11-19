import { Injectable } from '@nestjs/common';

import { GqlAuthJwtGuard } from './gql-auth-jwt.guard';

@Injectable()
export class JwtAuthGuard extends GqlAuthJwtGuard {}
