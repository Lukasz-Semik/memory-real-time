import { MigrationInterface, QueryRunner } from 'typeorm';

export class addPlayersIdToGame1606378027468 implements MigrationInterface {
  name = 'addPlayersIdToGame1606378027468';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "game" ADD "creatorId" character varying(255) NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "game" ADD "oponentId" character varying(255) NOT NULL`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "game" DROP COLUMN "oponentId"`);
    await queryRunner.query(`ALTER TABLE "game" DROP COLUMN "creatorId"`);
  }
}
