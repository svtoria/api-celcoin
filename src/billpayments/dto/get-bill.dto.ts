import { ApiProperty } from "@nestjs/swagger";
import { Transform, TransformFnParams, Type } from "class-transformer";
import {
  IsNotEmpty,
  IsNotEmptyObject,
  IsNumber,
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

export class GetBillDto {
  @ApiProperty()
  @IsNotEmpty({ message: "É necessário informar a identificação do usuário" })
  @IsString({ message: "Identificação do usuário inválida" })
  readonly externalTerminal: string;

  @ApiProperty()
  @IsNotEmpty({ message: "É necessário informar a variável de controle" })
  @IsNumber({}, { message: "Variável de controle inválida" })
  readonly externalNSU: number;

  @ApiProperty()
  @ValidateNested()
  @Type(() => Barcode)
  @IsNotEmptyObject(
    { nullable: false },
    { message: "Código de barras inválido" }
  )
  readonly barCode: Barcode;
}
