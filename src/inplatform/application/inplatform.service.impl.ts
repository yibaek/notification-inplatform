import { InplatformService } from './inplatform.service';
import { Inject, Injectable } from '@nestjs/common';
import { InplatformHistoryRepository } from '../infrastructure/inplatform.history.repository';
import { SaveCommand } from './command/save.command';
import { InplatformType } from '../type/inplatform.type';
import { SaveInfo } from './info/save.info';
import { MessageDomain } from '../domain/message/message.domain';
import { InplatformEntityMapper } from '../infrastructure/entity/inplatform.entity.mapper';
import { HistoryEntityMongo } from '../infrastructure/entity/history.entity.mongo';
import { TemplateServiceInternal } from '../../template/application/internal/template.service.internal';
import { InplatformError } from '../exception/inplatform.error';

@Injectable()
export class InplatformServiceImpl implements InplatformService {
  constructor(
    @Inject(TemplateServiceInternal)
    private readonly templateService: TemplateServiceInternal,
    @Inject(InplatformHistoryRepository)
    private readonly inplatformRepository: InplatformHistoryRepository,
  ) {}

  ////////////////////////////////////////////////
  //  Public Method
  ////////////////////////////////////////////////

  async save(command: SaveCommand.Message): Promise<SaveInfo.Info> {
    const resPayloadInfo = new SaveInfo.Payload();

    try {
      await Promise.all(
        command.getPayload().map(async (payload) => {
          resPayloadInfo.addContent(
            await this.sendMessageEachContent(command, payload),
          );
        }),
      );

      return new SaveInfo.Info()
        .setSuccess()
        .setTraceId(command.getTrace().getId())
        .setPayload(resPayloadInfo);
    } catch (e) {
      console.error(`[InplatformService/saveMessages()`, e);
    }
  }

  ////////////////////////////////////////////////
  //  Private Method
  ////////////////////////////////////////////////

  private async sendMessageEachContent(
    command: SaveCommand.Message,
    payload: SaveCommand.Payload,
  ) {
    const contentInfo = new SaveInfo.Content();

    await Promise.all(
      payload.getContents().map(async (content) => {
        let messageId = undefined;

        const message = await this.makeDomainMessage(payload, content);
        if (message) {
          messageId = await this.saveMessage(command, payload, message);
        }

        contentInfo.addData(messageId);
      }),
    );

    return contentInfo;
  }

  private async makeDomainMessage(
    payload: SaveCommand.Payload,
    content: InplatformType.Content,
  ) {
    try {
      if (payload.getAttribute().isTemplate()) {
        return this.makeDomainMessageByTemplateId(payload, content);
      }

      const property = payload.getAttribute().getProperty() as SaveCommand.Text;
      return new MessageDomain.Message(
        property.getCategory(),
        property.getSubject(),
        property.getText(),
        content,
      );
    } catch (e) {
      if (e! instanceof InplatformError.NotFoundTemplateInfoError) {
        console.error(`InplatformService/makeDomainMessage()`, e);
      }
      return undefined;
    }
  }

  private async makeDomainMessageByTemplateId(
    payload: SaveCommand.Payload,
    content: InplatformType.Content,
  ) {
    const templateId = (
      payload.getAttribute().getProperty() as SaveCommand.Template
    ).getTemplateId();

    const templateInfo = await this.getTemplateInfo(templateId);
    if (!templateInfo) {
      throw new InplatformError.NotFoundTemplateInfoError({
        templateId: templateId,
      });
    }

    return new MessageDomain.Message(
      templateInfo.category,
      templateInfo.subject,
      templateInfo.text,
      content,
    );
  }

  private async saveMessage(
    command: SaveCommand.Message,
    payload: SaveCommand.Payload,
    message: MessageDomain.Message,
  ): Promise<string> {
    try {
      // 메시지 저장
      return await this.inplatformRepository.save(
        InplatformEntityMapper.ofHistory(HistoryEntityMongo, {
          command,
          payload,
          message,
        }),
      );
    } catch (e) {
      console.error(`[InplatformService/saveMessage()`, e);
      return undefined;
    }
  }

  private async getTemplateInfo(
    templateId: string,
  ): Promise<InplatformType.Property | undefined> {
    const template = await this.templateService.get(templateId);
    if (!template) {
      return undefined;
    }

    return template as InplatformType.Property;
  }
}
