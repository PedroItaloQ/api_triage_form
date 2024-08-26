import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1724263980467 implements MigrationInterface {
    name = 'Default1724263980467'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "triage" ("id" SERIAL NOT NULL, "numberOfProcess" character varying NOT NULL, "author" text NOT NULL, "cpf" text NOT NULL, "bccReceiptDate" text NOT NULL, "bccReceiptTime" text NOT NULL, "captureDate" text NOT NULL, "captureTime" text NOT NULL, "distributionData" text NOT NULL, "processSystem" text NOT NULL, "typeOfCommunication" text NOT NULL, "communicationDate" text NOT NULL, "communicationTime" text NOT NULL, "endDateOfCommunication" text NOT NULL, "reu" text NOT NULL, "classe" text NOT NULL, "foro" text NOT NULL, "internalCode" text NOT NULL, "vara" text NOT NULL, "comarca" text NOT NULL, "justiceSecret" text NOT NULL, "tribunalDeOrigem" text NOT NULL, "subject" text NOT NULL, "hearingDate" text NOT NULL, "hearingTime" text NOT NULL, "causeValue" text NOT NULL, "forFulfillment" text NOT NULL, "fine" text NOT NULL, "tipeOfFine" text NOT NULL, "valueOfFine" text NOT NULL, "fatalDeadline" text NOT NULL, "assigned" text NOT NULL, "obfDescription" text NOT NULL, "observation" text NOT NULL, CONSTRAINT "PK_426f45e680e3e889cfd7106fd5a" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "triage"`);
    }

}
