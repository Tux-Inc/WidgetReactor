import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'employee' })
export class Employee {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    key_id: number;

    @Column('simple-json')
    rgpd: number[];

    @Column('simple-json')
    tags: number[];

    @Column('simple-json')
    picture: string[];
}
