import { Expose } from 'class-transformer';
import { IsString } from 'class-validator';

export namespace SaveCommand {
  export class Body {
    @Expose()
    @IsString()
    private readonly key: string;

    @Expose()
    @IsString()
    private readonly category: string;

    @Expose()
    @IsString()
    private readonly subject: string;

    @Expose()
    @IsString()
    private readonly text: string;

    getKey() {
      return this.key;
    }

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
}
