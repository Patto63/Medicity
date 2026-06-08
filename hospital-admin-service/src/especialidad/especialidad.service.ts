import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Especialidad } from './entities/especialidad.entity';
import { CreateEspecialidadDto } from './dto/create-especialidad.dto';
import { UpdateEspecialidadDto } from './dto/update-especialidad.dto';

@Injectable()
export class EspecialidadService {
  constructor(
    @InjectRepository(Especialidad)
    private readonly repo: Repository<Especialidad>,
  ) {}

  create(dto: CreateEspecialidadDto) {
    const especialidad = this.repo.create(dto);
    return this.repo.save(especialidad);
  }

  findAll() {
    return this.repo.find();
  }

  findOne(id: number) {
    return this.repo.findOne({ where: { id } });
  }

  async update(id: number, dto: UpdateEspecialidadDto) {
    await this.repo.update(id, dto);
    return this.findOne(id);
  }

  async remove(id: number) {
    const entidad = await this.findOne(id);
  
    if (!entidad) {
      throw new Error(`Centro Médico con ID ${id} no encontrado`);
    }
  
    return this.repo.remove(entidad);
  }
}
