import { IsOptional, IsString } from 'class-validator';
import { BaseInfo } from './base.info';

export namespace SaveInfo {
  export class Info extends BaseInfo.Info {
    @IsString()
    @IsOptional()
    private id: string;

    @IsString()
    @IsOptional()
    private key: string;

    setId(id: string) {
      this.id = id;
      return this;
    }

    setKey(key: string) {
      this.key = key;
      return this;
    }

    setSuccess(code?: number, message?: string): this {
      super.setSuccess(code, message);
      return this;
    }

    setFailure(message?: string, code?: number): this {
      super.setFailure(message, code);
      return this;
    }

    getInfo() {
      if (!this.isSuccess()) {
        return {
          code: this.getCode(),
          message: this.getMessage(),
        };
      }

      return {
        code: this.getCode(),
        message: this.getMessage(),
        id: this.id,
        key: this.key,
      };
    }
  }
}
