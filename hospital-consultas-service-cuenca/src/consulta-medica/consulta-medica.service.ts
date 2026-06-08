import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ConsultaMedica } from './entities/consulta-medica.entity';
import { CreateConsultaMedicaDto } from './dto/create-consulta-medica.dto';
import { UpdateConsultaMedicaDto } from './dto/update-consulta-medica.dto';

@Injectable()
export class ConsultaMedicaService {
  constructor(
    @InjectRepository(ConsultaMedica)
    private readonly consultaRepo: Repository<ConsultaMedica>,
  ) {}

  create(dto: CreateConsultaMedicaDto) {
    const nuevaConsulta = this.consultaRepo.create(dto);
    return this.consultaRepo.save(nuevaConsulta);
  }

  findAll() {
    return this.consultaRepo.find();
  }

  findOne(id: number) {
    return this.consultaRepo.findOne({ where: { id } });
  }

  async update(id: number, dto: UpdateConsultaMedicaDto) {
    await this.consultaRepo.update(id, dto);
    return this.findOne(id);
  }

  async remove(id: number) {
    const consulta = await this.findOne(id);
    if (!consulta) throw new Error(`Consulta con ID ${id} no encontrada`);
    return this.consultaRepo.remove(consulta);
  }

  async findOneById_Medico(medico_id: number){
    return  this.consultaRepo.find({ where : { medico_id:medico_id.toString()}});
  } 
}
