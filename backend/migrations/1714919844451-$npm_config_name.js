import typeorm from "typeorm";

const { MigrationInterface, QueryRunner } = typeorm;


export class  $npmConfigName1714919844451 {
    name = ' $npmConfigName1714919844451'

    async up(queryRunner) {
        await queryRunner.query(`
        ALTER TABLE "user" DROP COLUMN "id"
      `);
       await queryRunner.query(`
        ALTER TABLE "user"
        ADD "id_u" uuid NOT NULL DEFAULT uuid_generate_v4()
      `);
       await queryRunner.query(`
        ALTER TABLE "user"
        ADD CONSTRAINT  "PK_8e5cf05e47a1876df3ed5d32c42" PRIMARY KEY ("id_u")
       `);
        await queryRunner.query(`
            CREATE TABLE "comment" (
                "id_c" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "text" character varying NOT NULL,
                "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
                "userId" uuid NOT NULL,
                "movieId" uuid NOT NULL,
                CONSTRAINT "PK_04740c723a6d1f7f7f7604a9ba6" PRIMARY KEY ("id_c")
            )
        `);
        await queryRunner.query(`
            ALTER TABLE "movie" DROP CONSTRAINT "PK_cb3bb4d61cf764dc035cbedd422"
        `);
        await queryRunner.query(`
            ALTER TABLE "movie" DROP COLUMN "id"
        `);
        await queryRunner.query(`
            ALTER TABLE "movie"
            ADD "id_m" uuid NOT NULL DEFAULT uuid_generate_v4()
        `);
        await queryRunner.query(`
            ALTER TABLE "movie"
            ADD CONSTRAINT "PK_f2ab9b3944d98c6f413bfbd90ee" PRIMARY KEY ("id_m")
        `);
        await queryRunner.query(`
            ALTER TABLE "movie" DROP COLUMN "average"
        `);
        await queryRunner.query(`
            ALTER TABLE "movie"
            ADD "average" integer
        `);
        await queryRunner.query(`
            ALTER TABLE "comment"
            ADD CONSTRAINT "FK_c0354a9a009d3bb45a08655ce3b" FOREIGN KEY ("userId") REFERENCES "user"("id_u") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "comment"
            ADD CONSTRAINT "FK_aea4918c888422550a85e257894" FOREIGN KEY ("movieId") REFERENCES "movie"("id_m") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    }

    async down(queryRunner) {
        await queryRunner.query(`
            ALTER TABLE "comment" DROP CONSTRAINT "FK_aea4918c888422550a85e257894"
        `);
        await queryRunner.query(`
            ALTER TABLE "comment" DROP CONSTRAINT "FK_c0354a9a009d3bb45a08655ce3b"
        `);
        await queryRunner.query(`
            ALTER TABLE "movie" DROP COLUMN "average"
        `);
        await queryRunner.query(`
            ALTER TABLE "movie"
            ADD "average" real
        `);
        await queryRunner.query(`
            ALTER TABLE "movie" DROP CONSTRAINT "PK_f2ab9b3944d98c6f413bfbd90ee"
        `);
        await queryRunner.query(`
            ALTER TABLE "movie" DROP COLUMN "id_m"
        `);
        await queryRunner.query(`
            ALTER TABLE "movie"
            ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()
        `);
        await queryRunner.query(`
            ALTER TABLE "movie"
            ADD CONSTRAINT "PK_cb3bb4d61cf764dc035cbedd422" PRIMARY KEY ("id")
        `);
        await queryRunner.query(`
            DROP TABLE "comment"
        `);
        await queryRunner.query(`
            ALTER TABLE "user"
                RENAME CONSTRAINT "PK_8e5cf05e47a1876df3ed5d32c42" TO "PK_cace4a159ff9f2512dd42373760"
        `);
        await queryRunner.query(`
            ALTER TABLE "user"
                RENAME COLUMN "id_u" TO "id"
        `);
    }
}
