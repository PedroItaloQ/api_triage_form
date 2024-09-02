import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity('users')
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    lastName: string;

    @Column()
    userName: string;

    @Column()

    @Column()
    email: string;

    @Column()
    password: string;

    @Column()
    sector: string;

    @Column()
    state: string;

    @Column()
    role: string;
}