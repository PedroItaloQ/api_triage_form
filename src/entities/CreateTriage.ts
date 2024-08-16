import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity('triage')
export class User {
	@PrimaryGeneratedColumn()
	id: number

	@Column({ type: 'text' })
	name: string

	@Column({ type: 'text' })
	lastName: string

	@Column({ type: 'text', unique: true })
	email: string

	@Column({ type: 'text' })
	password: string

	@Column( {type: 'text'})
	sector: string

	@Column({ type: 'text' })
	state: string
}
