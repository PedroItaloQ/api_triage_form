import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1725283535167 implements MigrationInterface {
    name = 'Default1725283535167'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "username"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "name" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" ADD "lastName" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" ADD "userName" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" ADD "sector" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" ADD "state" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" ADD "role" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "role"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "state"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "sector"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "userName"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "lastName"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "name"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "username" character varying NOT NULL`);
    }

}
