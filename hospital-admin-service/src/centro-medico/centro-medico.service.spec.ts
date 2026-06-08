import { Test, TestingModule } from '@nestjs/testing';
import { CentroMedicoService } from './centro-medico.service';

describe('CentroMedicoService', () => {
  let service: CentroMedicoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CentroMedicoService],
    }).compile();

    service = module.get<CentroMedicoService>(CentroMedicoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
