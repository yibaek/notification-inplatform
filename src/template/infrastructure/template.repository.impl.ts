import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository } from 'typeorm';
import { TemplateRepository } from './template.repository';
import { TemplateEntityMongo } from './entity/template.entity.mongo';

@Injectable()
export class TemplateRepositoryImpl implements TemplateRepository {
  constructor(
    @InjectRepository(TemplateEntityMongo, 'default.mongo')
    private readonly templateRepository: MongoRepository<TemplateEntityMongo>,
  ) {}

  async save(entity: TemplateEntityMongo): Promise<string> {
    const result = await this.templateRepository.save(entity);
    return result._id.toString();
  }

  async getOneByKey(key: string): Promise<TemplateEntityMongo | null> {
    return await this.templateRepository.findOneBy({ key });
  }

  async getManyByKeys(
    keys: Array<string>,
  ): Promise<Array<TemplateEntityMongo | null>> {
    return await this.templateRepository.find({
      where: { key: { $in: keys } },
    });
  }

  async getAll(): Promise<Array<TemplateEntityMongo | null>> {
    return this.templateRepository.find();
  }
}
