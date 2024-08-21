import { BaseInfo } from './base.info';

export namespace SaveInfo {
  export class Content {
    private value: Array<{ id: string | undefined; code: number }> = new Array<{
      id: string | undefined;
      code: number;
    }>();

    addData(id: string | undefined) {
      this.value.push({ id, code: this.getCode(id) });
    }

    getValues() {
      return this.value.map((data) => {
        return data;
      });
    }

    private getCode(id: string | undefined) {
      return id === undefined ? 400 : 200;
    }
  }

  export class Payload {
    private value: Array<Content> = new Array<Content>();

    addContent(content: Content) {
      this.value.push(content);
    }

    getValues() {
      return this.value.map((content) => {
        return content.getValues();
      });
    }
  }

  export class Info extends BaseInfo.Info {
    private traceId: string;
    private payload: Payload;

    setSuccess(code?: number, message?: string) {
      super.setSuccess(code, message);
      return this;
    }

    setFailure(message?: string, code?: number) {
      super.setFailure(message, code);
      return this;
    }

    setTraceId(traceId: string) {
      this.traceId = traceId;
      return this;
    }

    setPayload(payload: Payload) {
      this.payload = payload;
      return this;
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
        traceId: this.traceId,
        payload: this.payload.getValues(),
      };
    }
  }
}
