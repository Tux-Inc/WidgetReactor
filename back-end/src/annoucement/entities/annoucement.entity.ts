import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'annoucement' })
export class Annoucement {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;
    @Column()
    content: string;
}
