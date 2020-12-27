import {MigrationInterface, QueryRunner} from "typeorm";

export class changeOponentCreatorInGame1609076941612 implements MigrationInterface {
    name = 'changeOponentCreatorInGame1609076941612'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "game" DROP COLUMN "creatorId"`);
        await queryRunner.query(`ALTER TABLE "game" DROP COLUMN "oponentId"`);
        await queryRunner.query(`ALTER TABLE "game" ADD "creator" text NOT NULL DEFAULT '{"id":"","nick":""}'`);
        await queryRunner.query(`ALTER TABLE "game" ADD "oponent" text NOT NULL DEFAULT '{"id":"","nick":""}'`);
        await queryRunner.query(`ALTER TABLE "game" ALTER COLUMN "tiles" SET DEFAULT '[{"id":"A-1","name":"A","markedBy":null},{"id":"A-2","name":"A","markedBy":null},{"id":"B-1","name":"B","markedBy":null},{"id":"B-2","name":"B","markedBy":null},{"id":"B-1","name":"C","markedBy":null},{"id":"C-2","name":"C","markedBy":null},{"id":"D-1","name":"D","markedBy":null},{"id":"D-2","name":"D","markedBy":null},{"id":"E-1","name":"E","markedBy":null},{"id":"E-2","name":"E","markedBy":null},{"id":"F-1","name":"F","markedBy":null},{"id":"F-2","name":"F","markedBy":null},{"id":"G-1","name":"G","markedBy":null},{"id":"G-2","name":"G","markedBy":null},{"id":"H-1","name":"H","markedBy":null},{"id":"H-2","name":"H","markedBy":null}]'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "game" ALTER COLUMN "tiles" SET DEFAULT '[{"id":"A-1","name":"A","markedBy":null},{"id":"A-2","name":"A","markedBy":null},{"id":"B-1","name":"B","markedBy":null},{"id":"B-2","name":"B","markedBy":null},{"id":"B-1","name":"C","markedBy":null},{"id":"C-2","name":"C","markedBy":null},{"id":"D-1","name":"D","markedBy":null},{"id":"D-2","name":"D","markedBy":null}]'`);
        await queryRunner.query(`ALTER TABLE "game" DROP COLUMN "oponent"`);
        await queryRunner.query(`ALTER TABLE "game" DROP COLUMN "creator"`);
        await queryRunner.query(`ALTER TABLE "game" ADD "oponentId" character varying(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "game" ADD "creatorId" character varying(255) NOT NULL`);
    }

}
