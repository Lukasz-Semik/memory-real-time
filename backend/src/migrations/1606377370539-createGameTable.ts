import { MigrationInterface, QueryRunner } from 'typeorm';

export class createGameTable1606377370539 implements MigrationInterface {
  name = 'createGameTable1606377370539';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "game" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_352a30652cd352f552fef73dec5" PRIMARY KEY ("id"))`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "game"`);
  }
}
