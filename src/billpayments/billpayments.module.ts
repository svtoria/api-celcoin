import { Module } from "@nestjs/common";
import { HttpModule } from "@nestjs/axios";
import { BillpaymentsService } from "./billpayments.service";
import { BillpaymentsController } from "./billpayments.controller";

@Module({
  imports: [HttpModule],
  controllers: [BillpaymentsController],
  providers: [BillpaymentsService],
})
export class BillpaymentsModule {}
