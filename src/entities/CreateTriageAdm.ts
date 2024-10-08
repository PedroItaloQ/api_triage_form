import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('triageAdm')
export class TriageAdm {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    dateOfReceipt: string;

    @Column({ nullable: true })
    dateOfTreatment: string;

    @Column({ nullable: true })
    subject: string;

    @Column({ nullable: true })
    type: string;

    @Column({ nullable: true })
    emission: string;

    @Column({ nullable: true })
    recipient: string;

    @Column({ nullable: true })
    areaSector: string;

    @Column({ nullable: true })
    responsible: string;

    @Column({ nullable: true })
    descriptionObf: string;

    @Column({ nullable: true })
    note: string;
}