import { HttpStatus } from '@nestjs/common';
import { OutCodeError } from '../../common/exception/base.error';

export namespace InplatformError {
  export class BaseError extends OutCodeError {}

  export class NotFoundTemplateInfoError extends BaseError {
    constructor(data = {}) {
      super(
        'Not found inplatform template data',
        HttpStatus.NOT_FOUND,
        false,
        {},
        data,
      );

      this.name = NotFoundTemplateInfoError.name;
      Object.setPrototypeOf(this, NotFoundTemplateInfoError.prototype);
    }
  }
}
