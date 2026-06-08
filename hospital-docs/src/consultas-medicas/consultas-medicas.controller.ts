import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ConsultasMedicasService } from './consultas-medicas.service';

@Controller('consultas-medicas')
export class ConsultasMedicasController {
  constructor(private readonly consultasMedicasService: ConsultasMedicasService) {}

  @Get('/motivos')
  obtenerConsultasMedicasPorcentaje(){
    return this.consultasMedicasService.obtenerPorcentajesMotivos();
  }
  @Get('/medicos')
  obtenerPorcentajesMedico(){
    return this.consultasMedicasService.obtenerPorcentajesMedico();
  }
 
}
