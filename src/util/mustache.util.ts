import Handlebars from 'handlebars';
import { InplatformType } from '../inplatform/type/inplatform.type';

export class MustacheUtil {
  static compile(source: string, content: InplatformType.Content): string {
    const template = Handlebars.compile(source);
    return template(content);
  }
}
