import {
  Controller, Get, Post, Body, Param, Put, Delete,
} from '@nestjs/common';
import { ConsultaMedicaService } from './consulta-medica.service';
import { CreateConsultaMedicaDto } from './dto/create-consulta-medica.dto';
import { UpdateConsultaMedicaDto } from './dto/update-consulta-medica.dto';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../common/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { ConsultaMedica } from './entities/consulta-medica.entity';

@ApiTags('Consulta Médica')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('medico', 'admin') 
@Controller('consulta-medica')
export class ConsultaMedicaController {
  constructor(private readonly service: ConsultaMedicaService) {}

  @Post()
  @ApiOperation({ summary: 'Crear una nueva consulta médica' })
  @ApiBody({ type: CreateConsultaMedicaDto })
  @ApiResponse({ status: 201, description: 'Consulta médica creada exitosamente', type: ConsultaMedica })
  create(@Body() dto: CreateConsultaMedicaDto) {
    return this.service.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todas las consultas médicas' })
  @ApiResponse({ status: 200, description: 'Lista de consultas médicas', type: [ConsultaMedica] })
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener una consulta médica por su ID' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 200, description: 'Consulta médica encontrada', type: ConsultaMedica })
  findOne(@Param('id') id: string) {
    return this.service.findOne(+id);
  }

  @Get('medico/:medico_id')
  @ApiOperation({ summary: 'Obtener consultas médicas por ID de médico' })
  @ApiParam({ name: 'medico_id', type: String })
  @ApiResponse({ status: 200, description: 'Consultas del médico', type: [ConsultaMedica] })
  findOneById_Medico(@Param('medico_id') medico_id: string) {
    return this.service.findOneById_Medico(+medico_id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar una consulta médica' })
  @ApiParam({ name: 'id', type: Number })
  @ApiBody({ type: UpdateConsultaMedicaDto })
  @ApiResponse({ status: 200, description: 'Consulta médica actualizada', type: ConsultaMedica })
  update(@Param('id') id: string, @Body() dto: UpdateConsultaMedicaDto) {
    return this.service.update(+id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar una consulta médica' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 200, description: 'Consulta médica eliminada' })
  remove(@Param('id') id: string) {
    return this.service.remove(+id);
  }
}
