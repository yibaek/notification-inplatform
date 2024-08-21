import { SaveCommand } from './command/save.command';
import { SaveInfo } from './info/save.info';

export const InplatformService = Symbol('InplatformService');

export interface InplatformService {
  save(command: SaveCommand.Message): Promise<SaveInfo.Info>;
}
