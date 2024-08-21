import { Expose } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export namespace SaveResponseDto {
  export class Body {
    @Expose()
    @IsNotEmpty()
    @IsNumber()
    private readonly code: number;

    @Expose()
    @IsNotEmpty()
    @IsString()
    private readonly message: string;

    @Expose()
    @IsNotEmpty()
    @IsString()
    private readonly id: string;

    @Expose()
    @IsNotEmpty()
    @IsString()
    private readonly key: string;
  }
}
