import { Expose } from 'class-transformer';
import { isArray } from 'lodash';

export namespace GetCommand {
  export class Body {
    @Expose()
    private readonly key: string | Array<string>;

    getKey() {
      return isArray(this.key) ? this.key : [this.key];
    }
  }
}
