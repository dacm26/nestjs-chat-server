import { Test, TestingModule } from '@nestjs/testing';
import { GatewayService } from './gateway.service';

describe('GatewayService', () => {
  let gateway: GatewayService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GatewayService],
    }).compile();

    gateway = module.get<GatewayService>(GatewayService);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
