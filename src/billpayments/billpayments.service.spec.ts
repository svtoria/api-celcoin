import { Test, TestingModule } from '@nestjs/testing';
import { BillpaymentsService } from './billpayments.service';

describe('BillpaymentsService', () => {
  let service: BillpaymentsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BillpaymentsService],
    }).compile();

    service = module.get<BillpaymentsService>(BillpaymentsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
