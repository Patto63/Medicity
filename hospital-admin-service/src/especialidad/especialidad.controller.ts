import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { EspecialidadService } from './especialidad.service';
import { CreateEspecialidadDto } from './dto/create-especialidad.dto';
import { UpdateEspecialidadDto } from './dto/update-especialidad.dto';
import { ApiTags } from '@nestjs/swagger';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../common/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';


@ApiTags('especialidad')
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('especialidad')
export class EspecialidadController {
  constructor(private readonly service: EspecialidadService) {}

  @Post()
  @Roles('admin')
  create(@Body() dto: CreateEspecialidadDto) {
    return this.service.create(dto);
  }

  @Get()
  @Roles('admin','medico')
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  @Roles('admin','medico')
  findOne(@Param('id') id: string) {
    return this.service.findOne(+id);
  }

  @Put(':id')
  @Roles('admin')
  update(@Param('id') id: string, @Body() dto: UpdateEspecialidadDto) {
    return this.service.update(+id, dto);
  }

  @Delete(':id')
  @Roles('admin')
  remove(@Param('id') id: string) {
    return this.service.remove(+id);
  }
}
