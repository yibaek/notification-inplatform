import { Expose } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export namespace GetResponseDto {
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
    @IsOptional()
    private readonly data: Record<string, any>;
  }
}
