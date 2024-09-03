import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1725374843141 implements MigrationInterface {
    name = 'Default1725374843141'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "lastName" character varying NOT NULL, "userName" character varying NOT NULL, "status" boolean NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "sector" character varying NOT NULL, "state" character varying NOT NULL, "role" character varying NOT NULL, CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "triage" ("id" SERIAL NOT NULL, "numberOfProcess" character varying NOT NULL, "author" text NOT NULL, "cpf" text NOT NULL, "bccReceiptDate" text NOT NULL, "bccReceiptTime" text NOT NULL, "captureDate" text NOT NULL, "captureTime" text NOT NULL, "distributionData" text NOT NULL, "processSystem" text NOT NULL, "typeOfCommunication" text NOT NULL, "communicationDate" text NOT NULL, "communicationTime" text NOT NULL, "endDateOfCommunication" text NOT NULL, "reu" text NOT NULL, "classe" text NOT NULL, "foro" text NOT NULL, "internalCode" text NOT NULL, "vara" text NOT NULL, "comarca" text NOT NULL, "justiceSecret" text NOT NULL, "tribunalDeOrigem" text NOT NULL, "subject" text NOT NULL, "hearingDate" text NOT NULL, "hearingTime" text NOT NULL, "causeValue" text NOT NULL, "forFulfillment" text NOT NULL, "fine" text NOT NULL, "tipeOfFine" text NOT NULL, "valueOfFine" text NOT NULL, "fatalDeadline" text NOT NULL, "assigned" text NOT NULL, "obfDescription" text NOT NULL, "status" text NOT NULL, "state" text NOT NULL, "observation" text NOT NULL, CONSTRAINT "PK_426f45e680e3e889cfd7106fd5a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "files" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "filename" character varying NOT NULL, "data" bytea NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_6c16b9093a142e0e7613b04a3d9" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "files"`);
        await queryRunner.query(`DROP TABLE "triage"`);
        await queryRunner.query(`DROP TABLE "users"`);
    }

}
