import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';

import { DatabaseOrmModule } from './database-orm.module';
import { AuthModule } from './modules/auth/auth.module';
import { FriendsModule } from './modules/friends/friends.module';
import { UserModule } from './modules/user/user.module';
import { EnvModule } from './modules/utils/env/env.module';
import { MailsModule } from './modules/utils/mails/mails.module';
import { TokenModule } from './modules/utils/token/token.module';

@Module({
  imports: [
    DatabaseOrmModule(),
    EnvModule,
    TokenModule,
    MailsModule,
    AuthModule,
    UserModule,
    FriendsModule,
    GraphQLModule.forRoot({
      autoSchemaFile: 'schema.gpl',
      installSubscriptionHandlers: true,
      context: ({ req }) => ({ req }),
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
