import {MigrationInterface, QueryRunner} from "typeorm";

export class addNickToUsers1602055986290 implements MigrationInterface {
    name = 'addNickToUsers1602055986290'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "nick" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "nick"`);
    }

}
