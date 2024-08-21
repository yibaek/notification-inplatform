import { SaveCommand } from './command/save.command';
import { SaveInfo } from './info/save.info';
import { GetCommand } from './command/get.command';
import { GetInfo } from './info/get.info';

export const TemplateService = Symbol('TemplateService');

export interface TemplateService {
  save(command: SaveCommand.Body): Promise<SaveInfo.Info>;
  update(command: SaveCommand.Body): Promise<SaveInfo.Info>;
  get(command: GetCommand.Body): Promise<GetInfo.Info>;
  getAll(): Promise<GetInfo.Info>;
}
