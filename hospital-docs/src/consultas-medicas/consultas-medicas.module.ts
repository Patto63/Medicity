import { Module } from '@nestjs/common';
import { ConsultasMedicasService } from './consultas-medicas.service';
import { ConsultasMedicasController } from './consultas-medicas.controller';
import { DatabaseModule } from 'database/database.module';

@Module({
  controllers: [ConsultasMedicasController],
  providers: [ConsultasMedicasService],
  imports:[DatabaseModule]
})
export class ConsultasMedicasModule {}
