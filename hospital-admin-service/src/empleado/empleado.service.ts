import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Empleado } from './entity/empleado.entity';
import { CreateEmpleadoDto } from './dto/create-empleado.dto';
import { UpdateEmpleadoDto } from './dto/update-empleado.dto';

@Injectable()
export class EmpleadoService {
  constructor(
    @InjectRepository(Empleado)
    private empleadoRepository: Repository<Empleado>,
  ) {}

  async create(createEmpleadoDto: CreateEmpleadoDto) {
    const { centro_medico_id, ...resto } = createEmpleadoDto;
  
    const nuevoEmpleado = this.empleadoRepository.create({
      ...resto,
      centroMedico: { id: centro_medico_id }, 
    });
  
    return this.empleadoRepository.save(nuevoEmpleado);
  }
  

  findAll() {
    return this.empleadoRepository.find({ relations: ['centroMedico'] });
  }

  findOne(id: string) {
    return this.empleadoRepository.findOne({
      where: { id },
      relations: ['centroMedico'],
    });
  }

  async update(id: string, updateEmpleadoDto: UpdateEmpleadoDto) {
    const { centro_medico_id, ...resto } = updateEmpleadoDto;
  
    await this.empleadoRepository.update(id, {
      ...resto,
      centroMedico: { id: centro_medico_id },
    });
  
    return this.findOne(id);
  }
  
  async remove(id: string) {
    const empleado = await this.findOne(id);
    if (!empleado) throw new BadRequestException(`No se encontró empleado con ID ${id}`);
    return this.empleadoRepository.remove(empleado);
  }
}
