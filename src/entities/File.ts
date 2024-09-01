import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('files')
export class File {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    filename: string;

    @Column({ type: 'bytea' })
    data: Buffer;

    @CreateDateColumn()
    createdAt: Date;
}
