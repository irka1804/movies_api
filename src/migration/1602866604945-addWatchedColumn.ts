import {MigrationInterface, QueryRunner} from "typeorm";

export class addWatchedColumn1602866604945 implements MigrationInterface {
    name = 'addWatchedColumn1602866604945'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "movie" ADD "watched" boolean NOT NULL DEFAULT false`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "movie" DROP COLUMN "watched"`);
    }

}
