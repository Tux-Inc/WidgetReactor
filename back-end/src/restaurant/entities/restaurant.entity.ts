import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'restaurant' })
export class Restaurant {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ type: 'int' })
  mark: number;

  @Column()
  loc: string;
}
