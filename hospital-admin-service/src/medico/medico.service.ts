import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Medico } from './entities/medico.entity';
import { CreateMedicoDto } from './dto/create-medico.dto';
import { UpdateMedicoDto } from './dto/update-medico.dto';
import { CentroMedico } from 'src/centro-medico/entities/centro-medico.entity';
import { Especialidad } from 'src/especialidad/entities/especialidad.entity';

@Injectable()
export class MedicoService {
  constructor(
    @InjectRepository(Medico)
    private readonly medicoRepo: Repository<Medico>,

    @InjectRepository(Especialidad)
    private readonly especialidadRepo: Repository<Especialidad>,

    @InjectRepository(CentroMedico)
    private readonly centroRepo: Repository<CentroMedico>,
  ) {}

  async create(dto: CreateMedicoDto) {
    const id = dto.id.toString(); 
    const existeMedico = await this.medicoRepo.findOne({ where: { id } });


    if (existeMedico) {throw new BadRequestException('La cédula ya está registrada');
    }
    const especialidad = await this.especialidadRepo.findOne({ where: { id: dto.especialidad_id } });
    if (!especialidad) {
      throw new BadRequestException(`No existe especialidad con id ${dto.especialidad_id}`);
    }

    const centro = await this.centroRepo.findOne({ where: { id: dto.centro_medico_id } });
    if (!centro) {
      throw new BadRequestException(`No existe centro médico con id ${dto.centro_medico_id}`);
    }

    const nuevoMedico = this.medicoRepo.create({
      id: dto.id,
      nombre: dto.nombre,
      apellido: dto.apellido,
      especialidad,
      centroMedico: centro,
    });

    return this.medicoRepo.save(nuevoMedico);
  }

  findAll() {
    return this.medicoRepo.find({ relations: ['especialidad', 'centroMedico'] });
  }

  findOne(id: string) {
    return this.medicoRepo.findOne({ where: { id }, relations: ['especialidad', 'centroMedico'] });
  }

  async update(id: string, dto: UpdateMedicoDto) {
    const especialidad = dto.especialidad_id
      ? await this.especialidadRepo.findOne({ where: { id: dto.especialidad_id } })
      : null;

    const centro = dto.centro_medico_id
      ? await this.centroRepo.findOne({ where: { id: dto.centro_medico_id } })
      : null;

    const updateData: Partial<Medico> = {
      nombre: dto.nombre,
      apellido: dto.apellido,
    };

    if (especialidad) updateData.especialidad = especialidad;
    if (centro) updateData.centroMedico = centro;

    await this.medicoRepo.update(id, updateData);
    return this.findOne(id);
  }

  async remove(id: string) {
    const medico = await this.findOne(id);
    if (!medico) throw new BadRequestException(`No se encontró médico con ID ${id}`);
    return this.medicoRepo.remove(medico);
  }
}
