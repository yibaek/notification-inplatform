import { ClassConstructor, plainToInstance } from 'class-transformer';
import { SaveResponseDto } from '../../interface/dto/save.response.dto';

export namespace SaveInfoMapper {
  export function of(
    to: ClassConstructor<SaveResponseDto.Body>,
    from: Record<any, any>,
  ): SaveResponseDto.Body;

  export function of(to: any, from: any): any {
    return plainToInstance(to, from, {
      excludeExtraneousValues: true,
    });
  }
}
