import { Expose, plainToInstance, Transform, Type } from 'class-transformer';
import { CommonEnum } from '../../../common/enum/common.enum';
import { InplatformEnum } from '../../enum/inplatform.enum';
import { InplatformType } from '../../type/inplatform.type';

export namespace SaveCommand {
  export class Template {
    @Expose()
    private readonly templateId: string;

    getTemplateId() {
      return this.templateId;
    }
  }

  export class Text {
    @Expose()
    private readonly category: string;

    @Expose()
    private readonly subject: string;

    @Expose()
    private readonly text: string;

    getCategory() {
      return this.category;
    }

    getSubject() {
      return this.subject;
    }

    getText() {
      return this.text;
    }
  }

  export class Attribute {
    @Expose()
    private readonly type: InplatformEnum.MESSAGE_TYPE;

    @Expose()
    @Transform(
      (em) => {
        if (em.obj.type === InplatformEnum.MESSAGE_TYPE.TEMPLATE) {
          return plainToInstance(Template, em.value);
        }
        return plainToInstance(Text, em.value);
      },
      { toClassOnly: true },
    )
    private readonly property: Text | Template;

    getProperty() {
      return this.property;
    }

    isTemplate() {
      return this.property instanceof Template;
    }
  }

  export class Payload {
    @Expose()
    private readonly charset: string;

    @Expose()
    private readonly language: CommonEnum.LANG;

    @Expose()
    private readonly userId: number;

    @Expose()
    private readonly groupId: number | undefined;

    @Expose()
    @Type(() => Attribute)
    private readonly attribute: Attribute;

    @Expose()
    private readonly contents: Array<InplatformType.Content>;

    getCharset() {
      return this.charset || 'UTF-8';
    }

    getLanguage() {
      return this.language || CommonEnum.LANG.KO;
    }

    getUserId() {
      return this.userId;
    }

    getGroupId() {
      return this.groupId;
    }

    getAttribute() {
      return this.attribute;
    }

    getContents() {
      return this.contents;
    }
  }

  export class Trace {
    @Expose()
    private readonly id: string;

    getId() {
      return this.id;
    }
  }

  export class Message {
    @Expose()
    private readonly environment: CommonEnum.ENV;

    @Expose()
    private readonly version: number;

    @Expose()
    @Type(() => Trace)
    private readonly trace: Trace;

    @Expose()
    @Type(() => Payload)
    private readonly payload: Array<Payload>;

    getVersion() {
      return this.version || 1;
    }

    getEnvironment() {
      return this.environment || CommonEnum.ENV.DEV;
    }

    getTrace() {
      return this.trace;
    }

    getPayload() {
      return this.payload;
    }
  }
}
