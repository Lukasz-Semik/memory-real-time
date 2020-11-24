import { MigrationInterface, QueryRunner } from 'typeorm';

export class addInvitersIdsToUsers1605867602267 implements MigrationInterface {
  name = 'addInvitersIdsToUsers1605867602267';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user" ADD "invitersIds" character varying array`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "invitersIds"`);
  }
}
