export const TemplateServiceInternal = Symbol('TemplateServiceInternal');

export interface TemplateServiceInternal {
  get(key: string): Promise<Record<string, any> | undefined>;
}
