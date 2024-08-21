import { ClassConstructor } from 'class-transformer';
import { HistoryEntityMongo } from './history.entity.mongo';
import { MessageDomain } from '../../domain/message/message.domain';
import { SaveCommand } from '../../application/command/save.command';

export namespace InplatformEntityMapper {
  export function ofHistory(
    to: ClassConstructor<HistoryEntityMongo>,
    from: {
      command: SaveCommand.Message;
      payload: SaveCommand.Payload;
      message: MessageDomain.Message;
    },
  ): HistoryEntityMongo {
    return HistoryEntityMongo.of({
      trace: { id: from.command.getTrace().getId() },
      user_id: from.payload.getUserId(),
      group_id: from.payload.getGroupId(),
      category: from.message.getCategory(),
      message: from.message.getMessage(),
    });
  }
}
