import { Controller, Get, UseGuards } from '@nestjs/common';
import { ReportsService } from './reports.service';
import { JwtAuthGuard } from '../common/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { ApiTags } from '@nestjs/swagger';
import { Roles } from '../common/decorators/roles.decorator';

@ApiTags('reportes')
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('reportes')
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}

  // === Reportes de Centro Médico ===

  @Get('porcentaje-pacientes')
  @Roles('admin', 'medico')  // 🔥 Admin y Médico
  getPorcentajePacientes() {
    return this.reportsService.cuantasConsultasTieneCadaCentroMedico();
  }

  @Get('reporte-consultas')
  @Roles('admin', 'medico')
  getReporteConsultas() {
    return this.reportsService.obtenerTodasLasConsultas();
  }

  @Get('total-empleados')
  @Roles('admin', 'medico')
  getTotalEmpleados() {
    return this.reportsService.obtenerEmpleados();
  }

  @Get('total-medicos')
  @Roles('admin', 'medico')
  getTotalMedicos() {
    return this.reportsService.obtenerMedicos();
  }

  // === Reportes de Consultas Médicas ===

  @Get('porcentaje-motivos')
  @Roles('admin', 'medico')
  getPorcentajeMotivos() {
    return this.reportsService.obtenerPorcentajesMotivos();
  }

  @Get('porcentaje-medicos')
  @Roles('admin', 'medico')
  getPorcentajeMedicos() {
    return this.reportsService.obtenerPorcentajesMedico();
  }
}
