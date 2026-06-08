import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Medico } from './entities/medico.entity';
import { MedicoService } from './medico.service';
import { MedicoController } from './medico.controller';
import { ConfigModule } from '@nestjs/config';
import { CentroMedico } from 'src/centro-medico/entities/centro-medico.entity';
import { Especialidad } from 'src/especialidad/entities/especialidad.entity';
import { JwtStrategy } from 'src/common/jwt.strategy';
import { AuthCoreModule } from 'src/common/auth-core.module';
import { HttpModule } from '@nestjs/axios';
import { MedicoPublicController } from './medico-public.controller';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forFeature([Medico, CentroMedico, Especialidad]),
    AuthCoreModule,
    HttpModule,
  ],
  controllers: [MedicoController, MedicoPublicController],
  providers: [MedicoService, JwtStrategy],
})
export class MedicoModule {}
