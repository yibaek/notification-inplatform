import { Expose } from 'class-transformer';
import { IsArray, IsNotEmpty, IsString } from 'class-validator';
import { BaseResponseDto } from './base.response.dto';

export namespace SaveResponseDto {
  export class Body extends BaseResponseDto.Body {
    @Expose()
    @IsNotEmpty()
    @IsString()
    private readonly traceId: string;

    @Expose()
    @IsArray()
    @IsNotEmpty()
    private readonly payload: Array<Array<{ id: string; code: number }>>;
  }
}
