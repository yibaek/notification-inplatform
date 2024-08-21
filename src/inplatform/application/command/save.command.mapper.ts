import { ClassConstructor, plainToInstance } from 'class-transformer';
import { SaveCommand } from './save.command';
import { SaveRequestDto } from '../../interface/dto/save.request.dto';

export namespace SaveCommandMapper {
  export function of(
    to: ClassConstructor<SaveCommand.Message>,
    from: SaveRequestDto.Message,
  ): SaveCommand.Message;

  export function of(to: any, from: any): any {
    return plainToInstance(to, from, {
      excludeExtraneousValues: true,
    });
  }
}
