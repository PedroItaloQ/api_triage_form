import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1725555525149 implements MigrationInterface {
    name = 'Default1725555525149'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "lastName" character varying NOT NULL, "userName" character varying NOT NULL, "status" boolean NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "sector" character varying NOT NULL, "state" character varying NOT NULL, "role" character varying NOT NULL, CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "triage" ("id" SERIAL NOT NULL, "numberOfProcess" character varying NOT NULL, "author" character varying NOT NULL, "cpf" character varying NOT NULL, "bccReceiptDate" character varying NOT NULL, "bccReceiptTime" character varying NOT NULL, "captureDate" character varying NOT NULL, "captureTime" character varying NOT NULL, "distributionData" character varying NOT NULL, "processSystem" character varying NOT NULL, "typeOfCommunication" character varying NOT NULL, "communicationDate" character varying NOT NULL, "communicationTime" character varying NOT NULL, "endDateOfCommunication" character varying NOT NULL, "reu" character varying NOT NULL, "classe" character varying NOT NULL, "foro" character varying NOT NULL, "internalCode" character varying NOT NULL, "vara" character varying NOT NULL, "comarca" character varying NOT NULL, "justiceSecret" character varying NOT NULL, "tribunalDeOrigem" character varying NOT NULL, "subject" character varying NOT NULL, "hearingDate" character varying NOT NULL, "hearingTime" character varying NOT NULL, "causeValue" character varying NOT NULL, "forFulfillment" character varying NOT NULL, "fine" character varying NOT NULL, "tipeOfFine" character varying NOT NULL, "valueOfFine" character varying NOT NULL, "fatalDeadline" character varying NOT NULL, "assigned" character varying NOT NULL, "obfDescription" character varying NOT NULL, "status" boolean NOT NULL, "state" character varying NOT NULL, "observation" character varying NOT NULL, CONSTRAINT "PK_426f45e680e3e889cfd7106fd5a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "files" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "filename" character varying NOT NULL, "data" bytea NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_6c16b9093a142e0e7613b04a3d9" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "files"`);
        await queryRunner.query(`DROP TABLE "triage"`);
        await queryRunner.query(`DROP TABLE "users"`);
    }

}
