import typeorm from "typeorm";

const { MigrationInterface, QueryRunner } = typeorm;
    
export class MonNomDeMigration1714469436431 {
        name = 'MonNomDeMigration1714469436431'
    async up(queryRunner) {
        await queryRunner.query(`
            ALTER TABLE "movie"
            ADD "average" real
        `);
        await queryRunner.query(`
            ALTER TABLE "movie"
            ADD "description" character varying
        `);
    }

    async down(queryRunner) {
        await queryRunner.query(`
            ALTER TABLE "movie" DROP COLUMN "description"
        `);
        await queryRunner.query(`
            ALTER TABLE "movie" DROP COLUMN "average"
        `);
    }
}
