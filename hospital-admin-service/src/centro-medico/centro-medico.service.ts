import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CentroMedico } from './entities/centro-medico.entity';
import { CreateCentroMedicoDto } from './dto/create-centro-medico.dto';
import { UpdateCentroMedicoDto } from './dto/update-centro-medico.dto';

@Injectable()
export class CentroMedicoService {
  constructor(
    @InjectRepository(CentroMedico)
    private readonly repo: Repository<CentroMedico>,
  ) {}

  create(dto: CreateCentroMedicoDto) {
    const nuevo = this.repo.create(dto);
    return this.repo.save(nuevo);
  }

  findAll() {
    return this.repo.find();
  }

  findOne(id: number) {
    return this.repo.findOne({ where: { id } });
  }

  async update(id: number, dto: UpdateCentroMedicoDto) {
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
