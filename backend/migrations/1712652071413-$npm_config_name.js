import typeorm from "typeorm";

const { MigrationInterface, QueryRunner } = typeorm;

export class  $npmConfigName1712652071413 {
    name = ' $npmConfigName1712652071413'
    
    
    async up(queryRunner) {
        await queryRunner.query(`
            ALTER TABLE "movie" DROP CONSTRAINT "UQ_a81090ad0ceb645f30f9399c347"
        `);
    }

    async down(queryRunner) {
        await queryRunner.query(`
            ALTER TABLE "movie"
            ADD CONSTRAINT "UQ_a81090ad0ceb645f30f9399c347" UNIQUE ("title")
        `);
    }
}
