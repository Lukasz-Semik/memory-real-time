import { MigrationInterface, QueryRunner } from 'typeorm';

export class addFriendsIdsColumn1605863108210 implements MigrationInterface {
  name = 'addFriendsIdsColumn1605863108210';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user" ADD "friendsIds" character varying array`
    );
    await queryRunner.query(
      `ALTER TABLE "user" ADD "invitedFriendsIds" character varying array`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user" DROP COLUMN "invitedFriendsIds"`
    );
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "friendsIds"`);
  }
}
