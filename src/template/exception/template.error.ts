import { HttpStatus } from '@nestjs/common';
import { OutCodeError } from '../../common/exception/base.error';

export namespace TemplateError {
  export class BaseError extends OutCodeError {}

  export class ExistKeyError extends BaseError {
    constructor(data = {}) {
      super('The key already exists.', HttpStatus.BAD_REQUEST, false, {}, data);

      this.name = ExistKeyError.name;
      Object.setPrototypeOf(this, ExistKeyError.prototype);
    }
  }

  export class NotFoundKeyError extends BaseError {
    constructor(data = {}) {
      super('The Key does not exist.', HttpStatus.BAD_REQUEST, false, {}, data);

      this.name = NotFoundKeyError.name;
      Object.setPrototypeOf(this, NotFoundKeyError.prototype);
    }
  }
}
