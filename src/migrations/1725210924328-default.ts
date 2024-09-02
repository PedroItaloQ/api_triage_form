import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1725210924328 implements MigrationInterface {
    name = 'Default1725210924328'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "files" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "filename" character varying NOT NULL, "data" bytea NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_6c16b9093a142e0e7613b04a3d9" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "files"`);
    }

}
