import { Expose } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export namespace BaseResponseDto {
  export abstract class Body {
    @Expose()
    @IsNotEmpty()
    @IsNumber()
    protected readonly code: number;

    @Expose()
    @IsNotEmpty()
    @IsString()
    protected readonly message: string;
  }
}
