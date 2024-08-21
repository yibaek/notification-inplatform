import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { HistoryEntityMongo } from './entity/history.entity.mongo';
import { MongoRepository } from 'typeorm';
import { InplatformHistoryRepository } from './inplatform.history.repository';

@Injectable()
export class InplatformHistoryRepositoryImpl
  implements InplatformHistoryRepository
{
  constructor(
    @InjectRepository(HistoryEntityMongo, 'default.mongo')
    private readonly historyRepository: MongoRepository<HistoryEntityMongo>,
  ) {}

  async save(entity: HistoryEntityMongo): Promise<string> {
    const result = await this.historyRepository.save(entity);
    return result._id.toString();
  }
}
