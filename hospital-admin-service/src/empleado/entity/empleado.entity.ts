import { Entity, Column, PrimaryColumn, ManyToOne, JoinColumn } from 'typeorm';
import { CentroMedico } from '../../centro-medico/entities/centro-medico.entity';

@Entity()
export class Empleado {
  @PrimaryColumn({ type: 'varchar', length: 10 })
  id: string;

  @Column()
  nombre: string;

  @Column()
  apellido: string;

  @Column()
  rol: string;

 @ManyToOne(() => CentroMedico)
 @JoinColumn({ name: 'centro_medico_id' })
 centroMedico: CentroMedico;
}
