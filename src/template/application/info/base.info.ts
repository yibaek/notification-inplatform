import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';

export namespace BaseInfo {
  export abstract class Info {
    @IsNumber()
    protected code: number = 400;
    @IsString()
    @IsOptional()
    protected message: string | undefined = undefined;
    @IsBoolean()
    private success: boolean = false;

    protected setSuccess(code?: number, message?: string) {
      this.success = true;

      this.code = code ?? this.code;
      this.message = message ?? this.message;
    }

    protected setFailure(message?: string, code?: number) {
      this.success = false;

      this.code = code ?? this.code;
      this.message = message ?? this.message;
    }

    protected isSuccess() {
      return this.success;
    }

    protected getInfo() {
      return {
        code: this.getCode(),
        message: this.getMessage(),
      };
    }

    protected getCode() {
      return this.success ? 200 : 400;
    }

    protected getMessage() {
      return this.success
        ? 'Success'
        : this.message ?? 'An error occurred during processing.';
    }
  }
}
