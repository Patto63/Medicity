import {
  Controller, Get, Post, Body, Param, Put, Delete,
} from '@nestjs/common';
import { ConsultaMedicaService } from './consulta-medica.service';
import { CreateConsultaMedicaDto } from './dto/create-consulta-medica.dto';
import { UpdateConsultaMedicaDto } from './dto/update-consulta-medica.dto';
import { ApiTags } from '@nestjs/swagger';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../common/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';


@ApiTags('consulta-medica')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('medico')
@Controller('consulta-medica')
export class ConsultaMedicaController {
  constructor(private readonly service: ConsultaMedicaService) {}

  @Post()
  create(@Body() dto: CreateConsultaMedicaDto) {
    return this.service.create(dto);
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(+id);
  }

  @Get('medico/:medico_id')
  findOneById_Medico(@Param('medico_id') medico_id: string) {
    return this.service.findOneById_Medico(+medico_id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: UpdateConsultaMedicaDto) {
    return this.service.update(+id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(+id);
  }
}
