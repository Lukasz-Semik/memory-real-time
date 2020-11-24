import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserEntity } from 'src/entities/user.entity';

import { AuthModule } from '../auth/auth.module';
import { UserModule } from '../user/user.module';
import { FriendsResolver } from './friends.resolver';
import { FriendsService } from './friends.service';

@Module({
  imports: [AuthModule, UserModule, TypeOrmModule.forFeature([UserEntity])],
  providers: [FriendsResolver, FriendsService],
})
export class FriendsModule {}
