  import {Controller,Get,Post,Body,Param,Put,Delete,} from '@nestjs/common';
  import { EmpleadoService } from './empleado.service';
  import { CreateEmpleadoDto } from './dto/create-empleado.dto';
  import { UpdateEmpleadoDto } from './dto/update-empleado.dto';
  import { ApiTags, ApiOperation } from '@nestjs/swagger';
  import { UseGuards } from '@nestjs/common';
  import { JwtAuthGuard } from '../common/jwt-auth.guard';
  import { RolesGuard } from '../common/guards/roles.guard';
  import { Roles } from '../common/decorators/roles.decorator';

  @ApiTags('empleado')
  @UseGuards(JwtAuthGuard, RolesGuard) 
  @Roles('admin') 
  @Controller('empleado')
  export class EmpleadoController {
    constructor(private readonly empleadoService: EmpleadoService) {}
  
    @Post()
    @ApiOperation({ summary: 'Crear un nuevo empleado' })
    create(@Body() createEmpleadoDto: CreateEmpleadoDto) {
      return this.empleadoService.create(createEmpleadoDto);
    }
  
    @Get()
    @ApiOperation({ summary: 'Listar todos los empleados' })
    findAll() {
      return this.empleadoService.findAll();
    }
  
    @Get(':id')
    @ApiOperation({ summary: 'Buscar empleado por ID' })
    findOne(@Param('id') id: string) {
      return this.empleadoService.findOne(id);
    }
  
    @Put(':id')
    @ApiOperation({ summary: 'Actualizar empleado por ID' })
    update(
      @Param('id') id: string,
      @Body() updateEmpleadoDto: UpdateEmpleadoDto,
    ) {
      return this.empleadoService.update(id, updateEmpleadoDto);
    }
  
    @Delete(':id')
    remove(@Param('id') id: string) {
      return this.empleadoService.remove(id);
    }
  }
  