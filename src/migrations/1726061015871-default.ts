import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1726061015871 implements MigrationInterface {
    name = 'Default1726061015871'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "triage" ("id" SERIAL NOT NULL, "numberOfProcess" character varying NOT NULL, "author" character varying NOT NULL, "cpf" character varying NOT NULL, "bccReceiptDate" character varying, "bccReceiptTime" character varying, "captureDate" character varying, "captureTime" character varying, "distributionData" character varying, "processSystem" character varying, "typeOfCommunication" character varying, "communicationDate" character varying, "communicationTime" character varying, "endDateOfCommunication" character varying, "reu" character varying, "classe" character varying, "foro" character varying, "internalCode" character varying, "vara" character varying, "comarca" character varying, "justiceSecret" character varying, "tribunalDeOrigem" character varying, "subject" character varying, "hearingDate" character varying, "hearingTime" character varying, "causeValue" character varying, "forFulfillment" character varying, "fine" character varying, "tipeOfFine" character varying, "valueOfFine" character varying, "fatalDeadline" character varying, "assigned" character varying, "obfDescription" character varying, "status" boolean, "state" character varying, "observation" character varying, CONSTRAINT "PK_426f45e680e3e889cfd7106fd5a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "files" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "filename" character varying NOT NULL, "data" bytea NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_6c16b9093a142e0e7613b04a3d9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "importedTriage" ("id" SERIAL NOT NULL, "numberOfProcess" character varying NOT NULL, "author" character varying NOT NULL, "cpf" character varying NOT NULL, "bccReceiptDate" character varying, "bccReceiptTime" character varying, "captureDate" character varying, "captureTime" character varying, "distributionData" character varying, "processSystem" character varying, "typeOfCommunication" character varying, "communicationDate" character varying, "communicationTime" character varying, "endDateOfCommunication" character varying, "reu" character varying, "classe" character varying, "foro" character varying, "internalCode" character varying, "vara" character varying, "comarca" character varying, "justiceSecret" character varying, "tribunalDeOrigem" character varying, "subject" character varying, "hearingDate" character varying, "hearingTime" character varying, "causeValue" character varying, "forFulfillment" character varying, "fine" character varying, "tipeOfFine" character varying, "valueOfFine" character varying, "fatalDeadline" character varying, "assigned" character varying, "obfDescription" character varying, "status" boolean, "state" character varying, "observation" character varying, CONSTRAINT "PK_76daa087d8d606a1ef8da2289ef" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "lastName" character varying NOT NULL, "userName" character varying NOT NULL, "status" boolean NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "sector" character varying NOT NULL, "state" character varying NOT NULL, "role" character varying NOT NULL, CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "importedTriage"`);
        await queryRunner.query(`DROP TABLE "files"`);
        await queryRunner.query(`DROP TABLE "triage"`);
    }

}
