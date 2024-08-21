import { MustacheUtil } from '../../../util/mustache.util';
import { InplatformType } from '../../type/inplatform.type';

export namespace MessageDomain {
  export class Message {
    private readonly category: string;
    private readonly subject: string;
    private readonly text: string;
    private readonly content: InplatformType.Content;

    constructor(
      category: string,
      subject: string,
      text: string,
      content: InplatformType.Content,
    ) {
      this.category = category;
      this.subject = subject;
      this.text = text;
      this.content = content;
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

    getMessage(): InplatformType.Property {
      return {
        category: this.compileWithMustache(this.category),
        subject: this.compileWithMustache(this.subject),
        text: this.compileWithMustache(this.text),
      };
    }

    private compileWithMustache(source: string) {
      return MustacheUtil.compile(source, this.content);
    }
  }
}
