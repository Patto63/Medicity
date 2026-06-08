import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
  } from 'typeorm';
  
  @Entity('usuario')
  export class Usuario {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column({ unique: true })
    correo: string;
  
    @Column()
    password: string;
  
    @Column({
      type: 'enum',
      enum: ['medico','admin'], // Roles dentro del sistema
    })
    rol: 'medico' | 'enfermero' | 'admin';
  
    @Column({ default: true })
    estado: boolean;
  
    @Column({ type: 'varchar', length: 10, nullable: true })
    medico_id: string;
  
    @Column({ type: 'varchar', length: 10, nullable: true })
    empleado_id: string;
  }
  