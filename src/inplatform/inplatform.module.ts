import { Module } from '@nestjs/common';
import { InplatformService } from './application/inplatform.service';
import { QueueController } from './interface/queue.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HistoryEntityMongo } from './infrastructure/entity/history.entity.mongo';
import { InplatformServiceImpl } from './application/inplatform.service.impl';
import { InplatformHistoryRepository } from './infrastructure/inplatform.history.repository';
import { InplatformHistoryRepositoryImpl } from './infrastructure/inplatform.history.repository.impl';
import { ApiController } from './interface/api.controller';
import { QueueService } from '../provider/queue/application/queue.service';
import { PubsubServiceImpl } from '../provider/queue/domain/pubsub/application/pubsub.service.impl';
import { TemplateModule } from '../template/template.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([HistoryEntityMongo], 'default.mongo'),
    TemplateModule,
  ],
  providers: [
    { provide: QueueService, useClass: PubsubServiceImpl },
    { provide: InplatformService, useClass: InplatformServiceImpl },
    {
      provide: InplatformHistoryRepository,
      useClass: InplatformHistoryRepositoryImpl,
    },
  ],
  controllers: [QueueController, ApiController],
})
export class InplatformModule {}
