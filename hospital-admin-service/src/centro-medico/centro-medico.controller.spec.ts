import { Test, TestingModule } from '@nestjs/testing';
import { CentroMedicoController } from './centro-medico.controller';

describe('CentroMedicoController', () => {
  let controller: CentroMedicoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CentroMedicoController],
    }).compile();

    controller = module.get<CentroMedicoController>(CentroMedicoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
