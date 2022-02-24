import {
  CaptureBillParamsDto,
  CaptureBillInfoDto,
} from "./dto/capture-bill.dto";
import {
  Body,
  Controller,
  Delete,
  HttpCode,
  Param,
  Post,
  Put,
} from "@nestjs/common";
import { BillpaymentsService } from "./billpayments.service";
import { GetBillDto } from "./dto/get-bill.dto";
import { PayBillDto } from "./dto/pay-bill.dto";
import { CancelBillParamsDto } from "./dto/cancel-bill.dto";
import { ReverseBillParamsDto } from "./dto/reverse-bill.dto";
import { ApiTags } from "@nestjs/swagger";

@ApiTags("Boleto")
@Controller("billpayments")
export class BillpaymentsController {
  constructor(private readonly billpaymentsService: BillpaymentsService) {}

  @Post("authorize")
  @HttpCode(200)
  async getBill(@Body() payload: GetBillDto): Promise<any> {
    return this.billpaymentsService.getBill(payload);
  }

  @Post("rescue")
  @HttpCode(200)
  async payBill(@Body() payload: PayBillDto): Promise<any> {
    return this.billpaymentsService.payBill(payload);
  }

  @Put("capture/:transactionId")
  @HttpCode(200)
  async captureBill(
    @Body() payload: CaptureBillInfoDto,
    @Param() params: CaptureBillParamsDto
  ): Promise<any> {
    return this.billpaymentsService.captureBill(payload, params);
  }

  @Delete("cancel/:transactionId")
  @HttpCode(200)
  async cancelBill(@Param() params: CancelBillParamsDto): Promise<any> {
    return this.billpaymentsService.cancelBill(params);
  }

  @Delete("reverse/:transactionId")
  @HttpCode(200)
  async reverseBill(@Param() params: ReverseBillParamsDto): Promise<any> {
    return this.billpaymentsService.reverseBill(params);
  }
}
