import { ClassConstructor, plainToInstance } from 'class-transformer';
import { SaveRequestDto } from '../../interface/dto/save.request.dto';
import { SaveCommand } from './save.command';
import { GetCommand } from './get.command';
import { GetRequestDto } from '../../interface/dto/get.request.dto';

export namespace CommandMapper {
  export function of(
    to: ClassConstructor<SaveCommand.Body>,
    from: SaveRequestDto.Body,
  ): SaveCommand.Body;

  export function of(
    to: ClassConstructor<GetCommand.Body>,
    from: GetRequestDto.Body,
  ): GetCommand.Body;

  export function of(
    to: ClassConstructor<GetCommand.Body>,
    from: Record<string, string | Array<string>>,
  ): GetCommand.Body;

  export function of(to: any, from: any): any {
    return plainToInstance(to, from, {
      excludeExtraneousValues: true,
    });
  }
}
