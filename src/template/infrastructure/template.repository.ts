import { TemplateEntityMongo } from './entity/template.entity.mongo';

export const TemplateRepository = Symbol('TemplateRepository');

export interface TemplateRepository {
  save(entity: TemplateEntityMongo): Promise<string>;
  getOneByKey(key: string): Promise<TemplateEntityMongo | null>;
  getManyByKeys(
    keys: Array<string>,
  ): Promise<Array<TemplateEntityMongo | null>>;
  getAll(): Promise<Array<TemplateEntityMongo | null>>;
}
