import { ClassConstructor, plainToInstance } from 'class-transformer';
import { SaveRequestDto } from './save.request.dto';

export namespace SaveDtoMapper {
  export function of(
    to: ClassConstructor<SaveRequestDto.Message>,
    from: string,
  ): SaveRequestDto.Message;

  export function of(to: any, from: any): any {
    return plainToInstance(to, from, {
      excludeExtraneousValues: true,
    });
  }
}
