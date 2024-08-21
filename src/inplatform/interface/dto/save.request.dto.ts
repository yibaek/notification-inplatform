import { Expose, plainToInstance, Transform, Type } from 'class-transformer';
import {
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { CommonEnum } from '../../../common/enum/common.enum';
import { InplatformEnum } from '../../enum/inplatform.enum';
import { InplatformType } from '../../type/inplatform.type';

export namespace SaveRequestDto {
  export class Template {
    @Expose()
    @IsString()
    private readonly templateId: string;
  }

  export class Text {
    @Expose()
    @IsString()
    private readonly category: string;

    @Expose()
    @IsString()
    private readonly subject: string;

    @Expose()
    @IsString()
    private readonly text: string;
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
  }

  export class Payload {
    @Expose()
    @IsOptional()
    private readonly charset;

    @Expose()
    @IsEnum(CommonEnum.LANG)
    @IsOptional()
    private readonly language: CommonEnum.LANG;

    @Expose()
    @IsNotEmpty()
    @IsNumber()
    private readonly userId: number;

    @Expose()
    @IsOptional()
    @IsNumber()
    private readonly groupId: number | undefined;

    @Expose()
    @IsNotEmpty()
    @Type(() => Attribute)
    private readonly attribute: Attribute;

    @Expose()
    @IsNotEmpty()
    @IsArray()
    private readonly contents: Array<InplatformType.Content>;
  }

  export class Trace {
    @Expose()
    @IsNotEmpty()
    private readonly id: string;
  }

  export class Message {
    @Expose()
    @IsEnum(CommonEnum.ENV)
    @IsOptional()
    private readonly environment: CommonEnum.ENV;

    @Expose()
    @IsOptional()
    private readonly version: number;

    @Expose()
    @IsNotEmpty()
    @Type(() => Trace)
    private readonly trace: Trace;

    @Expose()
    @IsNotEmpty()
    @IsArray()
    @Type(() => Payload)
    private readonly payload: Array<Payload>;
  }
}
