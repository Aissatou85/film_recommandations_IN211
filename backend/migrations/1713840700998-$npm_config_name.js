import typeorm from "typeorm";

const { MigrationInterface, QueryRunner } = typeorm;

export class $npmConfigName1713840700998 {
    name = ' $npmConfigName1713840700998'

    async up(queryRunner) {
        await queryRunner.query(`
            ALTER TABLE "movie"
            ADD "posterPath" character varying
        `);
    }
    

    async down(queryRunner) {
        await queryRunner.query(`
            ALTER TABLE "movie" DROP COLUMN "posterPath"
        `);
    }
}
