import { MigrationInterface, QueryRunner } from 'typeorm';

export class rebuildScoreInGame1609098520148 implements MigrationInterface {
  name = 'rebuildScoreInGame1609098520148';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "game" ADD "score" text NOT NULL DEFAULT '{"oponent":0,"creator":0}'`
    );
    await queryRunner.query(
      `ALTER TABLE "game" ALTER COLUMN "creator" SET DEFAULT '{"id":"","email":"","nick":""}'`
    );
    await queryRunner.query(
      `ALTER TABLE "game" ALTER COLUMN "oponent" SET DEFAULT '{"id":"","email":"","nick":""}'`
    );
    await queryRunner.query(
      // eslint-disable-next-line max-len
      `ALTER TABLE "game" ALTER COLUMN "tiles" SET DEFAULT '[{"id":"A-1","name":"A","markedBy":null},{"id":"A-2","name":"A","markedBy":null},{"id":"B-1","name":"B","markedBy":null},{"id":"B-2","name":"B","markedBy":null},{"id":"C-1","name":"C","markedBy":null},{"id":"C-2","name":"C","markedBy":null},{"id":"D-1","name":"D","markedBy":null},{"id":"D-2","name":"D","markedBy":null},{"id":"E-1","name":"E","markedBy":null},{"id":"E-2","name":"E","markedBy":null},{"id":"F-1","name":"F","markedBy":null},{"id":"F-2","name":"F","markedBy":null},{"id":"G-1","name":"G","markedBy":null},{"id":"G-2","name":"G","markedBy":null},{"id":"H-1","name":"H","markedBy":null},{"id":"H-2","name":"H","markedBy":null}]'`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      // eslint-disable-next-line max-len
      `ALTER TABLE "game" ALTER COLUMN "tiles" SET DEFAULT '[{"id":"A-1","name":"A","markedBy":null},{"id":"A-2","name":"A","markedBy":null},{"id":"B-1","name":"B","markedBy":null},{"id":"B-2","name":"B","markedBy":null},{"id":"B-1","name":"C","markedBy":null},{"id":"C-2","name":"C","markedBy":null},{"id":"D-1","name":"D","markedBy":null},{"id":"D-2","name":"D","markedBy":null},{"id":"E-1","name":"E","markedBy":null},{"id":"E-2","name":"E","markedBy":null},{"id":"F-1","name":"F","markedBy":null},{"id":"F-2","name":"F","markedBy":null},{"id":"G-1","name":"G","markedBy":null},{"id":"G-2","name":"G","markedBy":null},{"id":"H-1","name":"H","markedBy":null},{"id":"H-2","name":"H","markedBy":null}]'`
    );
    await queryRunner.query(
      `ALTER TABLE "game" ALTER COLUMN "oponent" SET DEFAULT '{"id":"","nick":""}'`
    );
    await queryRunner.query(
      `ALTER TABLE "game" ALTER COLUMN "creator" SET DEFAULT '{"id":"","nick":""}'`
    );
    await queryRunner.query(`ALTER TABLE "game" DROP COLUMN "score"`);
  }
}
