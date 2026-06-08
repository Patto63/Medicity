import {
    Controller, Get, Post, Body, Param, Put, Delete,
  } from '@nestjs/common';
  import { CentroMedicoService } from './centro-medico.service';
  import { CreateCentroMedicoDto } from './dto/create-centro-medico.dto';
  import { UpdateCentroMedicoDto } from './dto/update-centro-medico.dto';
  import { ApiTags, ApiOperation } from '@nestjs/swagger';
  import { UseGuards } from '@nestjs/common';
  import { JwtAuthGuard } from '../common/jwt-auth.guard';
  import { RolesGuard } from '../common/guards/roles.guard';
  import { Roles } from '../common/decorators/roles.decorator';

  
  @ApiTags('centro-medico')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Controller('centro-medico')
  export class CentroMedicoController {
    constructor(private readonly service: CentroMedicoService) {}
  
    @Post()
    @ApiOperation({ summary: 'Crear un nuevo centro médico' })
    create(@Body() dto: CreateCentroMedicoDto) {
      return this.service.create(dto);
    }
  
    @Get()
    @ApiOperation({ summary: 'Listar todos los centros médicos' })
    findAll() {
      return this.service.findAll();
    }
  
    @Get(':id')
    @ApiOperation({ summary: 'Obtener centro médico por ID' })
    findOne(@Param('id') id: string) {
      return this.service.findOne(+id);
    }
  
    @Put(':id')
    @ApiOperation({ summary: 'Actualizar centro médico por ID' })
    update(
      @Param('id') id: string,
      @Body() dto: UpdateCentroMedicoDto,
    ) {
      return this.service.update(+id, dto);
    }
  
    @Delete(':id')
    @ApiOperation({ summary: 'Eliminar centro médico por ID' })
    remove(@Param('id') id: string) {
      return this.service.remove(+id);
    }
  }
  