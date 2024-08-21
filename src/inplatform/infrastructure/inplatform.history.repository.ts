import { HistoryEntityMongo } from './entity/history.entity.mongo';

export const InplatformHistoryRepository = Symbol(
  'InplatformHistoryRepository',
);

export interface InplatformHistoryRepository {
  save(entity: HistoryEntityMongo): Promise<string>;
}
