import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity('triage')
export class Triage {
	@PrimaryGeneratedColumn()
  id: number;

  @Column()
  numberOfProcess: string;

  @Column()
  author: string;

  @Column()
  cpf: string;

  @Column({ nullable: true })
  bccReceiptDate: string;

  @Column({ nullable: true })
  bccReceiptTime: string;

  @Column({ nullable: true })
  captureDate: string;

  @Column({ nullable: true })
  captureTime: string;

  @Column({ nullable: true })
  distributionData: string;

  @Column({ nullable: true })
  processSystem: string;

  @Column({ nullable: true })
  typeOfCommunication: string;

  @Column({ nullable: true })
  communicationDate: string;

  @Column({ nullable: true })
  communicationTime: string;

  @Column({ nullable: true })
  endDateOfCommunication: string;

  @Column({ nullable: true })
  reu: string;

  @Column({ nullable: true })
  classe: string;

  @Column({ nullable: true })
  foro: string;

  @Column({ nullable: true })
  internalCode: string;

  @Column({ nullable: true })
  vara: string;

  @Column({ nullable: true })
  comarca: string;

  @Column({ nullable: true })
  justiceSecret: string;

  @Column({ nullable: true })
  tribunalDeOrigem: string;

  @Column({ nullable: true })
  subject: string;

  @Column({ nullable: true })
  hearingDate: string;

  @Column({ nullable: true })
  hearingTime: string;

  @Column({ nullable: true })
  causeValue: string;

  @Column({ nullable: true })
  forFulfillment: string;

  @Column({ nullable: true })
  fine: string;

  @Column({ nullable: true })
  tipeOfFine: string;

  @Column({ nullable: true })
  valueOfFine: string;

  @Column({ nullable: true })
  fatalDeadline: string;

  @Column({ nullable: true })
  assigned: string;

  @Column({ nullable: true })
  obfDescription: string;

  @Column({ nullable: true })
  status: boolean;

  @Column({ nullable: true })
  state: string;

  @Column({ nullable: true })
  observation: string;
}
