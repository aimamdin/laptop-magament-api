// Specs.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from "typeorm";

@Entity()
export class Specs {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    screenSize: string;

    @Column()
    processor: string;

    @Column()
    ram: string;

    @Column()
    storage: string;
}
