import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConsultaMedica } from './entities/consulta-medica.entity';
import { ConsultaMedicaService } from './consulta-medica.service';
import { ConsultaMedicaController } from './consulta-medica.controller';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from '../common/jwt.strategy'; 
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [TypeOrmModule.forFeature([ConsultaMedica]),
  JwtModule.registerAsync({
    useFactory: async (config: ConfigService) => ({
      secret: config.get<string>('JWT_SECRET') ,
      signOptions: { expiresIn: config.get<string>('JWT_EXPIRES_IN')  },
    }),
    inject: [ConfigService],
  }),

],
  controllers: [ConsultaMedicaController],
  providers: [ConsultaMedicaService, JwtStrategy],
})
export class ConsultaMedicaModule {}
