import { Controller, Get, Param, NotFoundException } from '@nestjs/common';
import { MedicoService } from './medico.service';

@Controller('public/medico')
export class MedicoPublicController {
  constructor(private readonly medicoService: MedicoService) {}

  @Get('ciudad/:id')
  async getCiudad(@Param('id') id: string) {
    const medico = await this.medicoService.findOne(id);
    if (!medico || !medico.centroMedico?.ciudad) {
      throw new NotFoundException(`Ciudad no encontrada para el médico ${id}`);
    }
    return { ciudad: medico.centroMedico.ciudad };
  }
}
