import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity('triage')
export class Triage {
	@PrimaryGeneratedColumn()
	id: number

	@Column()
	numberOfProcess: string;

	@Column()
	author: string;

	@Column()
	cpf: string;

	@Column()
	bccReceiptDate: string;

	@Column()
	bccReceiptTime: string;

	@Column()
	captureDate: string;

	@Column()
	captureTime: string;
	
	@Column()
	distributionData: string;
	
	@Column()
	processSystem: string;
	
	@Column()
	typeOfCommunication: string;
	
	@Column()
	communicationDate: string;
	
	@Column()
	communicationTime: string;
	
	@Column()
	endDateOfCommunication: string;
	
	@Column()
	reu: string;
	
	@Column()
	classe: string;
	
	@Column()
	foro: string;
	
	@Column()
	internalCode: string;
	
	@Column()
	vara: string;
	
	@Column()
	comarca: string;
	
	@Column()
	justiceSecret: string;
	
	@Column()
	tribunalDeOrigem: string;
	
	@Column()
	subject: string;
	
	@Column()
	hearingDate: string;
	
	@Column()
	hearingTime: string;
	
	@Column()
	causeValue: string;
	
	@Column()
	forFulfillment: string;
	
	@Column()
	fine: string;
	
	@Column()
	tipeOfFine: string;
	
	@Column()
	valueOfFine: string;
	
	@Column()
	fatalDeadline: string;
	
	@Column()
	assigned: string;
	
	@Column()
	obfDescription: string;

	@Column()
	status: boolean;

	@Column()
	state: string;
	
	@Column()
	observation: string;
}
