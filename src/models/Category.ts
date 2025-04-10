import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Grocery } from './Grocery';

@Entity()
export class Category {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 50, unique: true })
    name: string;

    @OneToMany(() => Grocery, grocery => grocery.category)
    groceries: Grocery[];
}