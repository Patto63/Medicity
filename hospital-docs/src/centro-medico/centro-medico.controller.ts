import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CentroMedicoService } from './centro-medico.service';

@Controller('centro-medico')
export class CentroMedicoController {
  constructor(private readonly centroMedicoService: CentroMedicoService) {}

  @Get('/porcentajePasientes')
  getPorcentajesConsultas(){
    return this.centroMedicoService.cuantasConsultasTieneCadaCentroMedico();
  }

  @Get('/reporteConsultas')
  getConsultas(){
    return this.centroMedicoService.obtenerTodasLasConsultas();
  }

  @Get('/totalEmpleados')
  getEmpleados(){
    return this.centroMedicoService.obtenerEmpleados();
  }

  @Get('/totalMedicos')
  getMedicos(){
    return this.centroMedicoService.obtenerMedicos();
  }

}
/**
 * 
 */