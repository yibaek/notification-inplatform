import { Expose } from 'class-transformer';

export namespace GetRequestDto {
  export class Body {
    @Expose()
    private readonly key: string | Array<string>;
  }
}
