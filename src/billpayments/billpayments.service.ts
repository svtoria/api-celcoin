import {
  CaptureBillInfoDto,
  CaptureBillParamsDto,
} from "./dto/capture-bill.dto";
import { HttpService } from "@nestjs/axios";
import { HttpException, Injectable } from "@nestjs/common";
import { catchError, lastValueFrom, map, pipe } from "rxjs";
import { CancelBillParamsDto } from "./dto/cancel-bill.dto";
import { GetBillDto } from "./dto/get-bill.dto";
import { PayBillDto } from "./dto/pay-bill.dto";
import { ReverseBillParamsDto } from "./dto/reverse-bill.dto";

@Injectable()
export class BillpaymentsService {
  constructor(private http: HttpService) {}

  private url = `${process.env.CELCOIN_URL}/transactions/billpayments`;

  async getBill(payload: GetBillDto): Promise<any> {
    return this.http.post(`${this.url}/authorize`, { ...payload }).pipe(
      catchError((e: any) => {
        const errorData = e.response.data;
        throw new HttpException(
          {
            ...errorData,
            message: [errorData.message],
            statusCode: e.response.status,
          },
          e.response.status
        );
      }),
      map((res: any) => res.data)
    );
  }

  async payBill(payload: PayBillDto): Promise<any> {
    return this.http.post(`${this.url}`, { ...payload }).pipe(
      catchError((e: any) => {
        const errorData = e.response.data;
        throw new HttpException(
          {
            ...errorData,
            message: [errorData.message],
            statusCode: e.response.status,
          },
          e.response.status
        );
      }),
      map((res: any) => res.data)
    );
  }

  async captureBill(
    payload: CaptureBillInfoDto,
    params: CaptureBillParamsDto
  ): Promise<any> {
    return this.http
      .put(`${this.url}/${params.transactionId}/capture`, {
        ...payload,
      })
      .pipe(
        catchError((e: any) => {
          const errorData = e.response.data;
          throw new HttpException(
            {
              ...errorData,
              message: [errorData.message],
              statusCode: e.response.status,
            },
            e.response.status
          );
        }),
        map((res: any) => res.data)
      );
  }

  async cancelBill(params: CancelBillParamsDto): Promise<any> {
    return this.http.delete(`${this.url}/${params.transactionId}/void`).pipe(
      catchError((e: any) => {
        const errorData = e.response.data;
        throw new HttpException(
          {
            ...errorData,
            message: [errorData.message],
            statusCode: e.response.status,
          },
          e.response.status
        );
      }),
      map((res: any) => res.data)
    );
  }

  async reverseBill(params: ReverseBillParamsDto): Promise<any> {
    return this.http.delete(`${this.url}/${params.transactionId}/reverse`).pipe(
      catchError((e: any) => {
        const errorData = e.response.data;
        throw new HttpException(
          {
            ...errorData,
            message: [errorData.message],
            statusCode: e.response.status,
          },
          e.response.status
        );
      }),
      map((res: any) => res.data)
    );
  }
}
