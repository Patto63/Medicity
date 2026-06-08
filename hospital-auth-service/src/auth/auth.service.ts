import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from '../users/users.service';
import { BadRequestException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { Usuario } from '../users/entities/usuario.entity';



@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private httpService: HttpService
    
  ) {}

  async register(dto: CreateUserDto) {
    const existe = await this.usersService.findByCorreo(dto.correo);
    if (existe) throw new BadRequestException('El correo ya está registrado');

    if (dto.medico_id) {
      const medicoExistente = await this.usersService.findByMedicoId(dto.medico_id);
      if (medicoExistente) {
        throw new BadRequestException('La cédula ya está registrada como médico');
      }
    }

    if (dto.empleado_id) {
      const empleadoExistente = await this.usersService.findByEmpleadoId(dto.empleado_id);
      if (empleadoExistente) {
        throw new BadRequestException('La cédula ya está registrada como empleado');
      }
    }
    const hashedPassword = await bcrypt.hash(dto.password, 10);
  
    const nuevo = await this.usersService.crear({
      correo: dto.correo,
      password: hashedPassword,
      rol: dto.rol,
      estado: true,
      medico_id: dto.medico_id,
      empleado_id: dto.empleado_id
    });
  
    return {
      message: 'Usuario registrado exitosamente',
      id: nuevo.id
    };
  }
  
  async login(correo: string, password: string) {
    const user = await this.usersService.findByCorreo(correo);
  
    if (!user) throw new UnauthorizedException('Usuario no encontrado');
  
    const passwordValida = await bcrypt.compare(password, user.password);
    if (!passwordValida) throw new UnauthorizedException('Credenciales inválidas');
  
    let ciudad = 'Quito'; 
  
    if (user.rol === 'medico' && user.medico_id) {
      try {
        const { data } = await firstValueFrom(
          this.httpService.get(`http://localhost:3000/public/medico/ciudad/${user.medico_id}`)
        );
        ciudad = data.ciudad || 'Quito';
      } catch (error) {
        console.warn(`No se pudo obtener la ciudad para el médico ${user.medico_id}`);
      }
    }
  
    const payload = {
      sub: user.id,
      correo: user.correo,
      rol: user.rol,
      ciudad,
      medico_id: user.medico_id || null,
      empleado_id: user.empleado_id || null,
    };
  
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
  

  async actualizarUsuarioDeMedico(medico_id: string, nuevoCorreo: string) {
    const usuario = await this.usersService.findByMedicoId(medico_id);
    if (!usuario) throw new NotFoundException('Usuario no encontrado para ese médico');
  
    const existeCorreo = await this.usersService.findByCorreo(nuevoCorreo);
    if (existeCorreo && existeCorreo.id !== usuario.id) {
      throw new BadRequestException('El correo ya está en uso');
    }
  
    usuario.correo = nuevoCorreo;
    return this.usersService.actualizar(usuario);
  }

  async deleteByMedicoId(medicoId: string): Promise<{ message: string }> {
    const usuario = await this.usersService.findByMedicoId(medicoId);
    if (!usuario) throw new NotFoundException('Usuario no encontrado para ese médico');
  
    await this.usersService.deleteByMedicoId(medicoId);
    return { message: 'Usuario eliminado exitosamente' };
  }
  
    
 
  
}
