import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Grocery } from './Grocery';

@Entity()
export class Inventory {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'int' })
    quantity: number;

    @ManyToOne(() => Grocery, grocery => grocery.inventory)
    grocery: Grocery;
}