import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class CentroMedico {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;
    
  @Column()
  direccion: string;

  @Column()
  ciudad: string;

  @Column()
  telefono: string;
  
  
}
