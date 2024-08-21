import { Body, Controller, Inject, Post } from '@nestjs/common';
import { InplatformService } from '../application/inplatform.service';
import { SaveCommandMapper } from '../application/command/save.command.mapper';
import { SaveCommand } from '../application/command/save.command';
import { SaveRequestDto } from './dto/save.request.dto';
import { SaveInfoMapper } from '../application/info/save.info.mapper';
import { SaveResponseDto } from './dto/save.response.dto';
import { PubsubRequestDto } from '../../provider/queue/domain/pubsub/interface/pubsub.request.dto';
import { QueueCommandMapper } from '../../provider/queue/application/command/queue.command.mapper';
import { PubsubGetCommand } from '../../provider/queue/domain/pubsub/application/command/pubsub-get.command';
import { QueueService } from '../../provider/queue/application/queue.service';
import { SaveInfo } from '../application/info/save.info';

@Controller('inplatform/queue')
export class QueueController {
  constructor(
    @Inject(QueueService)
    private readonly queueService: QueueService,
    @Inject(InplatformService)
    private readonly inplatformService: InplatformService,
  ) {}

  @Post()
  async save(@Body() body: PubsubRequestDto.Body) {
    try {
      // 큐(pubsub) 메시지를 커맨드로 변환
      const command = QueueCommandMapper.of(PubsubGetCommand.Body, body);

      // 큐(pubsub) 커맨드를 알림 메시지 구조로 변환
      const messages = this.queueService.get<SaveRequestDto.Message>(command);

      // 알림을 저장
      const info = await this.inplatformService.save(
        SaveCommandMapper.of(SaveCommand.Message, messages),
      );

      return SaveInfoMapper.of(SaveResponseDto.Body, info.getInfo());
    } catch (e) {
      console.error(`QueueController/save()`, e);
      return SaveInfoMapper.of(
        SaveResponseDto.Body,
        new SaveInfo.Info().getInfo(),
      );
    }
  }
}
