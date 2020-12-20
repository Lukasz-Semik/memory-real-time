import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateGameFields1608323817871 implements MigrationInterface {
    name = 'CreateGameFields1608323817871'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "game" ADD "roundCount" integer NOT NULL DEFAULT 0`);
        await queryRunner.query(`ALTER TABLE "game" ADD "currentPlayer" character varying(255)`);
        await queryRunner.query(`ALTER TABLE "game" ADD "creatorScore" integer NOT NULL DEFAULT 0`);
        await queryRunner.query(`ALTER TABLE "game" ADD "oponentScore" integer NOT NULL DEFAULT 0`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "game" DROP COLUMN "oponentScore"`);
        await queryRunner.query(`ALTER TABLE "game" DROP COLUMN "creatorScore"`);
        await queryRunner.query(`ALTER TABLE "game" DROP COLUMN "currentPlayer"`);
        await queryRunner.query(`ALTER TABLE "game" DROP COLUMN "roundCount"`);
    }

}
