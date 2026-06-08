// src/empleado/empleado.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Empleado } from './entity/empleado.entity';
import { EmpleadoService } from './empleado.service';
import { EmpleadoController } from './empleado.controller';
import { AuthCoreModule } from 'src/common/auth-core.module';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config/dist';

@Module({

  imports: [
    ConfigModule, 
    TypeOrmModule.forFeature([Empleado]),
    AuthCoreModule,
    HttpModule,
],
  controllers: [EmpleadoController],
  providers: [EmpleadoService],
})
export class EmpleadoModule {}
