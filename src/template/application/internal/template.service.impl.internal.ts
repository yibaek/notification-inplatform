import { Inject, Injectable } from '@nestjs/common';
import { TemplateServiceInternal } from './template.service.internal';
import { TemplateRepository } from '../../infrastructure/template.repository';

@Injectable()
export class TemplateServiceImplInternal implements TemplateServiceInternal {
  constructor(
    @Inject(TemplateRepository)
    private readonly templateRepository: TemplateRepository,
  ) {}

  async get(key: string): Promise<Record<string, any> | undefined> {
    try {
      const entity = await this.templateRepository.getOneByKey(key);
      if (!entity) {
        return undefined;
      }

      return {
        category: entity.category,
        subject: entity.subject,
        text: entity.text,
      };
    } catch (e) {
      console.error(`TemplateServiceInternal/get()`, e);
      return undefined;
    }
  }
}
