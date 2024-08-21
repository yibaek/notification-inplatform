import { IsOptional, IsString } from 'class-validator';
import { BaseInfo } from './base.info';

export namespace GetInfo {
  export type Content = {
    category: string;
    subject: string;
    text: string;
  };

  export class Template {
    @IsString()
    private readonly category;

    @IsString()
    private readonly subject;

    @IsString()
    private readonly text;

    constructor(category: string, subject: string, text: string) {
      this.category = category;
      this.subject = subject;
      this.text = text;
    }

    getData(): Content {
      return {
        category: this.category,
        subject: this.subject,
        text: this.text,
      };
    }
  }

  export class Info extends BaseInfo.Info {
    @IsString()
    @IsOptional()
    private data: Map<string, Content> = new Map<string, Content>();

    setSuccess(code?: number, message?: string) {
      super.setSuccess(code, message);
      return this;
    }

    setFailure(message?: string, code?: number) {
      super.setFailure(message, code);
      return this;
    }

    addData(key: string, data: Template) {
      this.data.set(key, data.getData());
      return this;
    }

    getData(key?: string) {
      if (key) {
        return this.data.get(key);
      }

      return Object.fromEntries(this.data);
    }

    getInfo() {
      if (!this.isSuccess) {
        return {
          code: this.getCode(),
          message: this.getMessage(),
        };
      }

      return {
        code: this.getCode(),
        message: this.getMessage(),
        data: this.getData(),
      };
    }
  }
}
