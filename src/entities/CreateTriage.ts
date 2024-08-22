import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity('triage')
export class Triage {
	@PrimaryGeneratedColumn()
	id: number

	@Column()
	numberOfProcess: string;

	@Column({ type: 'text' })
	author: string;

	@Column({ type: 'text' })
	cpf: string;

	@Column({ type: 'text' })
	bccReceiptDate: string;

	@Column({ type: 'text' })
	bccReceiptTime: string;

	@Column( {type: 'text'})
	captureDate: string;

	@Column({ type: 'text' })
	captureTime: string;
	
	@Column({ type: 'text' })
	distributionData: string;
	
	@Column({ type: 'text' })
	processSystem: string;
	
	@Column({ type: 'text' })
	typeOfCommunication: string;
	
	@Column({ type: 'text' })
	communicationDate: string;
	
	@Column({ type: 'text' })
	communicationTime: string;
	
	@Column({ type: 'text' })
	endDateOfCommunication: string;
	
	@Column({ type: 'text' })
	reu: string;
	
	@Column({ type: 'text' })
	classe: string;
	
	@Column({ type: 'text' })
	foro: string;
	
	@Column({ type: 'text' })
	internalCode: string;
	
	@Column({ type: 'text' })
	vara: string;
	
	@Column({ type: 'text' })
	comarca: string;
	
	@Column({ type: 'text' })
	justiceSecret: string;
	
	@Column({ type: 'text' })
	tribunalDeOrigem: string;
	
	@Column({ type: 'text' })
	subject: string;
	
	@Column({ type: 'text' })
	hearingDate: string;
	
	@Column({ type: 'text' })
	hearingTime: string;
	
	@Column({ type: 'text' })
	causeValue: string;
	
	@Column({ type: 'text' })
	forFulfillment: string;
	
	@Column({ type: 'text' })
	fine: string;
	
	@Column({ type: 'text' })
	tipeOfFine: string;
	
	@Column({ type: 'text' })
	valueOfFine: string;
	
	@Column({ type: 'text' })
	fatalDeadline: string;
	
	@Column({ type: 'text' })
	assigned: string;
	
	@Column({ type: 'text' })
	obfDescription: string;
	
	@Column({ type: 'text' })
	observation: string;
}
