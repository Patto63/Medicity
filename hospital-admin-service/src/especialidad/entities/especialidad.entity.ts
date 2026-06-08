import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Especialidad {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;
}
