import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CentroMedico } from './entities/centro-medico.entity';
import { CentroMedicoService } from './centro-medico.service';
import { CentroMedicoController } from './centro-medico.controller';
import { AuthCoreModule } from 'src/common/auth-core.module';

@Module({
  imports: [TypeOrmModule.forFeature([CentroMedico]),AuthCoreModule],
  controllers: [CentroMedicoController],
  providers: [CentroMedicoService],
  exports: [TypeOrmModule],
})
export class CentroMedicoModule {}  
