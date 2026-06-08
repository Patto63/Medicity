import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class ConsultaMedica {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  paciente_nombre: string;

  @Column()
  paciente_apellido: string;

  @Column()
  fecha: Date;

  @Column({ type: 'text' })
  motivo: string;

  @Column()
  medico_id: string;
}
