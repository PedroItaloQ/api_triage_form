import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('triageAdm')
export class TriageAdm {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    dateOfReceipt: Date;

    @Column({ nullable: true })
    dateOfTreatment: Date;

    @Column({ nullable: true })
    subject: string;

    @Column({ nullable: true })
    type: string;

    @Column({ nullable: true })
    emission: string;

    @Column({ nullable: true })
    recipient: string;

    @Column({ nullable: true })
    sector: string;

    @Column({ nullable: true })
    responsible: string;

    @Column({ nullable: true })
    obs: string;

    @Column({ nullable: true })
    nota: string;
}