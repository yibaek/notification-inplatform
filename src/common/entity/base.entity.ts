import { entries } from 'lodash';

export type TMutable<T> = {
  -readonly [P in keyof T]?: T[P];
};

export abstract class BaseEntity<T> {
  protected mutable(props: TMutable<T>) {
    for (const [key, value] of entries(props)) {
      (this as any)[key] = value;
    }
  }

  protected mutableForUpdate(props: TMutable<T>) {
    for (const [key, value] of entries(props)) {
      (this as any)[key] = value ?? (this as any)[key];
    }
  }
}
