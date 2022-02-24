import { Test, TestingModule } from '@nestjs/testing';
import { BillpaymentsController } from './billpayments.controller';
import { BillpaymentsService } from './billpayments.service';

describe('BillpaymentsController', () => {
  let controller: BillpaymentsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BillpaymentsController],
      providers: [BillpaymentsService],
    }).compile();

    controller = module.get<BillpaymentsController>(BillpaymentsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
