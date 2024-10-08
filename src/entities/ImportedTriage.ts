import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('importedTriage')
export class ImportedTriage {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  processNumber: string;

  @Column()
  plaintiff: string;

  @Column()
  cpfCnpj: string;

  @Column({ nullable: true })
  bccReceivedDate: string;

  @Column({ nullable: true })
  bccReceivedTime: string;

  @Column({ nullable: true })
  captureDate: string;

  @Column({ nullable: true })
  captureTime: string;

  @Column({ nullable: true })
  distributionDate: string;

  @Column({ nullable: true })
  processSystem: string;

  @Column({ nullable: true })
  communicationType: string;

  @Column({ nullable: true })
  communicationDate: string;

  @Column({ nullable: true })
  communicationTime: string;

  @Column({ nullable: true })
  communicationEndDate: string;

  @Column({ nullable: true })
  defendant: string;

  @Column({ nullable: true })
  class_: string;

  @Column({ nullable: true })
  forum: string;

  @Column({ nullable: true })
  internalCode: string;

  @Column({ nullable: true })
  court: string;

  @Column({ nullable: true })
  district: string;

  @Column({ nullable: true })
  justiceSecret: string;

  @Column({ nullable: true })
  originCourt: string;

  @Column({ nullable: true })
  subject: string;

  @Column({ nullable: true })
  hearingDate: string;

  @Column({ nullable: true })
  hearingTime: string;

  @Column({ nullable: true })
  caseValue: string;

  @Column({ nullable: true })
  forCompliance: string;

  @Column({ nullable: true })
  penalty: string;

  @Column({ nullable: true })
  penaltyType: string;

  @Column({ nullable: true })
  penaltyAmount: string;

  @Column({ nullable: true })
  deadline: string;

  @Column({ nullable: true })
  responsible: string;

  @Column({ nullable: true })
  obfDescription: string;

  @Column({ nullable: true })
  status: string;

  @Column({ nullable: true })
  state: string;

  @Column({ nullable: true })
  note: string;
}
