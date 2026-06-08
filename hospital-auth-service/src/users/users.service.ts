import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Usuario } from './entities/usuario.entity';
import { DeleteResult, Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Usuario)
    private repo: Repository<Usuario>,
  ) {}

  async findByCorreo(correo: string): Promise<Usuario | null> {
    return this.repo.findOne({ where: { correo } });
  }

  async findByMedicoId(cedula: string): Promise<Usuario | null> {
    return this.repo.findOne({ where: { medico_id: cedula } });
  }
  
  async findByEmpleadoId(cedula: string): Promise<Usuario | null> {
    return this.repo.findOne({ where: { empleado_id: cedula } });
  }
  
  async crear(data: Partial<Usuario>): Promise<Usuario> {
    const usuario = this.repo.create(data);
    return this.repo.save(usuario);
  }

  async eliminarPorCedula(cedula: string): Promise<DeleteResult> {
    return this.repo.delete({ medico_id: cedula });
  }

  async actualizar(usuario: Usuario): Promise<Usuario> {
    return this.repo.save(usuario);
  }
  
  async deleteByMedicoId(medicoId: string): Promise<void> {
    const usuario = await this.findByMedicoId(medicoId);
    if (usuario) {
      await this.repo.remove(usuario);
    } 
  }
  async findAll(): Promise<Usuario[]> {
    return this.repo.find();
  }
  
}
