import { Module } from '@nestjs/common';
import { EspecialidadController } from './especialidad.controller';
import { EspecialidadService } from './especialidad.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Especialidad } from './entities/especialidad.entity';
import { AuthCoreModule } from 'src/common/auth-core.module';

@Module({
  imports:[TypeOrmModule.forFeature([Especialidad])
  ,AuthCoreModule],
  controllers: [EspecialidadController],
  providers: [EspecialidadService]
})
export class EspecialidadModule {}
