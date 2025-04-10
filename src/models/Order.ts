import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity()
export class Orders {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('simple-json')
    items: Array<{
        groceryId: number;
        name: string;
        quantity: number;
        price: number;
    }>;

    @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
    total: number;

    @CreateDateColumn()
    createdAt: Date;
}