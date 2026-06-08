import { Entity, Column, PrimaryColumn, ManyToOne, JoinColumn } from 'typeorm';
import { CentroMedico } from 'src/centro-medico/entities/centro-medico.entity';
import { Especialidad } from 'src/especialidad/entities/especialidad.entity';

@Entity()
export class Medico {
  @PrimaryColumn({ type: 'varchar', length: 10 })
  id: string;

  @Column()
  nombre: string;

  @Column()
  apellido: string;

  @ManyToOne(() => Especialidad)
  @JoinColumn({ name: 'especialidad_id' })
  especialidad: Especialidad;

  @ManyToOne(() => CentroMedico)
  @JoinColumn({ name: 'centro_medico_id' })
  centroMedico: CentroMedico;
}
