import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class LoginDto {
  @Field() readonly accessToken: string;
}
