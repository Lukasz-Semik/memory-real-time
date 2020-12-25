import { MigrationInterface, QueryRunner } from 'typeorm';

export class addBoardColumn1608493964300 implements MigrationInterface {
  name = 'addBoardColumn1608493964300';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      // eslint-disable-next-line max-len
      `ALTER TABLE "game" ADD "tiles" text NOT NULL DEFAULT '[{"name":"A","markedBy":null},{"name":"A","markedBy":null},{"name":"B","markedBy":null},{"name":"B","markedBy":null},{"name":"C","markedBy":null},{"name":"C","markedBy":null},{"name":"D","markedBy":null},{"name":"D","markedBy":null}]'`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "game" DROP COLUMN "tiles"`);
  }
}
