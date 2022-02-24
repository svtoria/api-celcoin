import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CaptureBillInfoDto {
  @ApiProperty()
  @IsNotEmpty({ message: "É necessário informar a identificação do usuário" })
  @IsString({ message: "Identificação do usuário inválida" })
  readonly externalTerminal: string;

  @ApiProperty()
  @IsNotEmpty({ message: "É necessário informar a variável de controle" })
  @IsNumber({}, { message: "Variável de controle inválida" })
  readonly externalNSU: number;
}

export class CaptureBillParamsDto {
  @IsNotEmpty({
    message: "É necessário informar o ID da transação a ser capturada",
  })
  @IsString({
    message: "É necessário informar o ID da transação a ser capturada",
  })
  readonly transactionId: string;
}
