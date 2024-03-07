// Laptop.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from "typeorm";
import { Specs } from "./Specs";

@Entity()
export class Laptop {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    brand: string;

    @Column()
    model: string;

    @Column()
    price: number;

    @OneToOne(() => Specs, { cascade: true, onDelete: "CASCADE" })
    @JoinColumn({ name: "specs_id" })
    specs: Specs;

}
