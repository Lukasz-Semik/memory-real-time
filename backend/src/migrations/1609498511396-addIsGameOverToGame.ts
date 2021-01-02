import { MigrationInterface, QueryRunner } from 'typeorm';

export class addIsGameOverToGame1609498511396 implements MigrationInterface {
  name = 'addIsGameOverToGame1609498511396';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "game" ADD "isGameOver" boolean NOT NULL DEFAULT false`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "game" DROP COLUMN "isGameOver"`);
  }
}
