import {
  Controller, Post, Get, UseGuards, Body, Request, Put, Param, Delete,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from '../common/decorators/roles.decorator';
import { RolesGuard } from './guards/roles.guard';
import { UsersService } from 'src/users/users.service';
import {
  ApiTags, ApiBearerAuth, ApiOperation, ApiResponse, ApiBody, ApiParam,
} from '@nestjs/swagger';

@ApiTags('Autenticación')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService, private usersService: UsersService) {}

  @Post('login')
  @ApiOperation({ summary: 'Iniciar sesión y obtener token JWT' })
  @ApiBody({ type: LoginDto })
  @ApiResponse({ status: 201, description: 'Token generado exitosamente' })
  @ApiResponse({ status: 401, description: 'Credenciales inválidas' })
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto.correo, loginDto.password);
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('admin')
  @Post('register')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Registrar nuevo usuario (solo admin)' })
  @ApiBody({ type: CreateUserDto })
  @ApiResponse({ status: 201, description: 'Usuario registrado exitosamente' })
  @ApiResponse({ status: 400, description: 'Datos inválidos o duplicados' })
  register(@Body() dto: CreateUserDto) {
    return this.authService.register(dto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('perfil')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Obtener perfil del usuario autenticado' })
  @ApiResponse({ status: 200, description: 'Perfil del usuario' })
  getPerfil(@Request() req) {
    return {
      id: req.user.userId,
      correo: req.user.correo,
      rol: req.user.rol,
    };
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('admin')
  @Put('users/medico/:id')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Actualizar correo del médico' })
  @ApiParam({ name: 'id', required: true, description: 'ID del médico' })
  @ApiBody({ schema: { example: { correo: 'nuevo@correo.com' } } })
  updateUsuarioMedico(@Param('id') id: string, @Body() dto: { correo: string }) {
    return this.authService.actualizarUsuarioDeMedico(id, dto.correo);
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('admin')
  @Delete('users/medico/:medico_id')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Eliminar usuario de un médico' })
  @ApiParam({ name: 'medico_id', required: true, description: 'Cédula del médico' })
  deleteUsuarioMedico(@Param('medico_id') medicoId: string) {
    return this.authService.deleteByMedicoId(medicoId);
  }
}
