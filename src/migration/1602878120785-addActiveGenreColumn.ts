import {MigrationInterface, QueryRunner} from "typeorm";

export class addActiveGenreColumn1602878120785 implements MigrationInterface {
    name = 'addActiveGenreColumn1602878120785'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "genre" ADD "active" boolean NOT NULL DEFAULT false`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "genre" DROP COLUMN "active"`);
    }

}
