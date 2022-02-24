import { ApiProperty } from "@nestjs/swagger";
import { Transform, TransformFnParams, Type } from "class-transformer";
import {
  IsNotEmpty,
  IsNotEmptyObject,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  MaxLength,
  Min,
  MinLength,
  ValidateNested,
} from "class-validator";

export class Barcode {
  @ApiProperty()
  @IsString({ message: "Código de barras inválido" })
  @IsNotEmpty({ message: "É necessário informar o código de barras" })
  @Transform(({ value }: TransformFnParams) =>
    value.replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, "")
  )
  @MinLength(44)
  @MaxLength(48)
  readonly barCode: string;

  @ApiProperty()
  @MinLength(44)
  @MaxLength(48)
  @IsNotEmpty({ message: "É necessário informar o código de barras" })
  @IsString({ message: "Código de barras inválido" })
  @Transform(({ value }: TransformFnParams) =>
    value.replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, "")
  )
  readonly digitable: string;

  @ApiProperty()
  @IsNotEmpty({ message: "É necessário o tipo de conta" })
  @IsNumber(
    { allowNaN: false, allowInfinity: false },
    { message: "Tipo de conta inválido" }
  )
  @Min(0, { message: "O tipo precisa ser 0, 1 ou 2" })
  @Max(2, { message: "O tipo precisa ser 0, 1 ou 2" })
  readonly type: number;
}

export class InfoBearer {
  @ApiProperty()
  @IsNotEmpty({ message: "É necessário o nome do pagador" })
  readonly nameBearer: string;

  @ApiProperty()
  @IsNotEmpty({ message: "É necessário o CPF do pagador" })
  readonly documentBearer: string;

  @ApiProperty()
  @IsNotEmpty({ message: "É necessário o método de pagamento" })
  readonly methodPaymentCode: number;
}

export class BillData {
  @ApiProperty()
  @IsNumber(
    { allowNaN: false, allowInfinity: false },
    { message: "É necessário informar o valor do boleto" }
  )
  @IsNotEmpty({ message: "É necessário informar o valor do boleto" })
  @IsNumber(
    { allowNaN: false, allowInfinity: false },
    { message: "É necessário informar o valor do boleto" }
  )
  @IsNotEmpty({ message: "É necessário informar o valor do boleto" })
  readonly value: number;

  @ApiProperty()
  @IsNumber(
    { allowNaN: false, allowInfinity: false },
    { message: "É necessário informar o valor do boleto" }
  )
  @IsNotEmpty({ message: "É necessário informar o valor do boleto" })
  readonly originalValue: number;

  @ApiProperty()
  @IsNumber(
    { allowNaN: false, allowInfinity: false },
    { message: "É necessário informar o valor do boleto" }
  )
  @IsNotEmpty({ message: "É necessário informar o valor do boleto" })
  readonly valueWithDiscount: number;

  @ApiProperty()
  @IsNumber(
    { allowNaN: false, allowInfinity: false },
    { message: "É necessário informar o valor do boleto" }
  )
  @IsNotEmpty({ message: "É necessário informar o valor do boleto" })
  readonly valueWithAdditional: number;
}

export class PayBillDto {
  @ApiProperty()
  @IsNotEmpty({ message: "É necessário informar a variável de controle" })
  @IsNumber({}, { message: "Variável de controle inválida" })
  readonly externalNSU: number;

  @ApiProperty()
  @IsNotEmpty({ message: "É necessário informar a identificação do usuário" })
  @IsString({ message: "Identificação do usuário inválida" })
  readonly externalTerminal: string;

  @ApiProperty()
  @IsNotEmpty({ message: "É necessário informar a identificação do usuário" })
  @IsString({ message: "Identificação do usuário inválida" })
  readonly cpfcnpj: string;

  @ApiProperty()
  @ValidateNested()
  @Type(() => BillData)
  @IsNotEmptyObject(
    { nullable: false },
    { message: "Informações do boleto incorretas" }
  )
  readonly billData: BillData;

  @ApiProperty()
  @ValidateNested()
  @Type(() => InfoBearer)
  @IsNotEmptyObject(
    { nullable: false },
    { message: "Informações do usuário incorretas" }
  )
  readonly infoBearer: InfoBearer;

  @ApiProperty()
  @ValidateNested()
  @Type(() => Barcode)
  @IsNotEmptyObject(
    { nullable: false },
    { message: "Informações do boleto incorretas" }
  )
  readonly barCode: Barcode;

  @ApiProperty()
  @IsString({ message: "Data de Vencimento inválida" })
  readonly dueDate: Date;

  @ApiProperty()
  @IsNotEmpty({ message: "É necessário informar A autorização da Transação" })
  @IsNumber(
    { allowNaN: false, allowInfinity: false },
    { message: "Autorização inválida" }
  )
  readonly transactionIdAuthorize: number;

  @ApiProperty()
  @IsNotEmpty({ message: "É necessário informar o tipo de usuário" })
  @IsNumber(
    { allowNaN: false, allowInfinity: false },
    { message: "Tipo de usuário inválido" }
  )
  readonly userType: number;

  @ApiProperty()
  @IsOptional()
  @IsString({ message: "Autorização inválida" })
  readonly corban: string;
}
