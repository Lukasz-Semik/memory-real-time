import { MigrationInterface, QueryRunner } from 'typeorm';

export class addFirstTileShotToGameTable1608666661744
  implements MigrationInterface {
  name = 'addFirstTileShotToGameTable1608666661744';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "game" ADD "firstTileShot" character varying(255)`
    );
    await queryRunner.query(
      // eslint-disable-next-line max-len
      `ALTER TABLE "game" ALTER COLUMN "tiles" SET DEFAULT '[{"id":"A-1","name":"A","markedBy":null},{"id":"A-2","name":"A","markedBy":null},{"id":"B-1","name":"B","markedBy":null},{"id":"B-2","name":"B","markedBy":null},{"id":"B-1","name":"C","markedBy":null},{"id":"C-2","name":"C","markedBy":null},{"id":"D-1","name":"D","markedBy":null},{"id":"D-2","name":"D","markedBy":null}]'`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      // eslint-disable-next-line max-len
      `ALTER TABLE "game" ALTER COLUMN "tiles" SET DEFAULT '[{"name":"A","markedBy":null},{"name":"A","markedBy":null},{"name":"B","markedBy":null},{"name":"B","markedBy":null},{"name":"C","markedBy":null},{"name":"C","markedBy":null},{"name":"D","markedBy":null},{"name":"D","markedBy":null}]'`
    );
    await queryRunner.query(`ALTER TABLE "game" DROP COLUMN "firstTileShot"`);
  }
}
