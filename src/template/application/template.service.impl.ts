import { TemplateService } from './template.service';
import { Inject, Injectable } from '@nestjs/common';
import { TemplateRepository } from '../infrastructure/template.repository';
import { SaveInfo } from './info/save.info';
import { SaveCommand } from './command/save.command';
import { TemplateEntityMongo } from '../infrastructure/entity/template.entity.mongo';
import { TemplateError } from '../exception/template.error';
import { GetCommand } from './command/get.command';
import { GetInfo } from './info/get.info';

@Injectable()
export class TemplateServiceImpl implements TemplateService {
  constructor(
    @Inject(TemplateRepository)
    private readonly templateRepository: TemplateRepository,
  ) {}

  async save(command: SaveCommand.Body): Promise<SaveInfo.Info> {
    try {
      const exist = await this.templateRepository.getOneByKey(command.getKey());
      if (exist) {
        throw new TemplateError.ExistKeyError();
      }

      const id = await this.templateRepository.save(
        TemplateEntityMongo.of({
          key: command.getKey(),
          category: command.getCategory(),
          subject: command.getSubject(),
          text: command.getText(),
        }),
      );

      return new SaveInfo.Info()
        .setSuccess()
        .setId(id)
        .setKey(command.getKey());
    } catch (e) {
      console.error(`TemplateService/save()`, e);
      if (e instanceof TemplateError.BaseError) {
        return new SaveInfo.Info().setFailure(e.message);
      }

      return new SaveInfo.Info().setFailure();
    }
  }

  async update(command: SaveCommand.Body): Promise<SaveInfo.Info> {
    try {
      const entity = await this.templateRepository.getOneByKey(
        command.getKey(),
      );
      if (!entity) {
        throw new TemplateError.NotFoundKeyError();
      }

      entity.update({
        category: command.getCategory(),
        subject: command.getSubject(),
        text: command.getText(),
      });

      const id = await this.templateRepository.save(entity);
      return new SaveInfo.Info()
        .setSuccess()
        .setId(id)
        .setKey(command.getKey());
    } catch (e) {
      console.error(`TemplateService/update()`, e);
      if (e instanceof TemplateError.BaseError) {
        return new SaveInfo.Info().setFailure(e.message);
      }

      return new SaveInfo.Info().setFailure();
    }
  }

  async get(command: GetCommand.Body): Promise<GetInfo.Info> {
    try {
      const response = new GetInfo.Info();

      const entities = await this.templateRepository.getManyByKeys(
        command.getKey(),
      );

      if (entities.length === 0) {
        throw new TemplateError.NotFoundKeyError();
      }

      entities.forEach((entity) => {
        if (entity) {
          response.addData(
            entity.key,
            new GetInfo.Template(entity.category, entity.subject, entity.text),
          );
        }
      });

      return response.setSuccess();
    } catch (e) {
      console.error(`TemplateService/get()`, e);
      if (e instanceof TemplateError.BaseError) {
        return new GetInfo.Info().setFailure(e.message);
      }

      return new GetInfo.Info().setFailure();
    }
  }

  async getAll(): Promise<GetInfo.Info> {
    try {
      const response = new GetInfo.Info();

      const entities = await this.templateRepository.getAll();

      entities.forEach((entity) => {
        if (entity) {
          response.addData(
            entity.key,
            new GetInfo.Template(entity.category, entity.subject, entity.text),
          );
        }
      });

      return response.setSuccess();
    } catch (e) {
      console.error(`TemplateService/getAll()`, e);
      if (e instanceof TemplateError.BaseError) {
        return new GetInfo.Info().setFailure(e.message);
      }

      return new GetInfo.Info().setFailure();
    }
  }
}
