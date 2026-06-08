import {
  Controller,
  Post,
  Body,
  Req,
  UseGuards,
  HttpException,
  BadRequestException,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import axios from 'axios';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { JwtAuthGuard } from '../common/jwt-auth.guard';
import { MicroserviceUrls } from '../config/microservices.config'; 
@Controller('auth')
export class AuthController {
  private authServiceUrl = MicroserviceUrls.authService; 

  @Post('login')
  async login(@Body() body: any) {
    try {
      const response = await axios.post(`${this.authServiceUrl}/auth/login`, body);
      return response.data;
    } catch (error) {
      if (error.response) {
        const { status, data } = error.response;
        throw new HttpException(data, status);
      }
      throw new InternalServerErrorException('Error interno al intentar logear');
    }
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Post('register')
  async register(@Body() body: any, @Req() req) {
    const token = req.headers.authorization;

    try {
      const response = await axios.post(`${this.authServiceUrl}/auth/register`, body, {
        headers: {
          Authorization: token,
        },
      });
      return response.data;
    } catch (error) {
      const status = error?.response?.status;
      const message = error?.response?.data?.message || 'Error desconocido';

      if (status === 400) throw new BadRequestException(message);
      if (status === 401) throw new UnauthorizedException(message);
      throw new InternalServerErrorException(message);
    }
  }
}
