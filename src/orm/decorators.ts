// src/orm/decorators.ts
import 'reflect-metadata';
import { getEntityMetadata} from './metadata';

export function Entity(tableName?: string) {
  return function (constructor: Function) {
    const meta = getEntityMetadata(constructor);
    if (tableName) {
      meta.tableName = tableName;
    }
  };
}
interface ColumnOptions {
  name?: string;
  type?: string;
  primary?: boolean;
  nullable?: boolean;
}

export function Column(opts: ColumnOptions = {}) {
  return function (target: any, propertyKey: string) {
    const constructor = target.constructor;
    const meta = getEntityMetadata(constructor);

    // Determine column type via options or reflected design:type
    const reflectedType = Reflect.getMetadata('design:type', target, propertyKey);
    const tsType = reflectedType?.name.toLowerCase() ?? 'unknown';

    meta.columns[propertyKey] = {
      name: opts.name ?? propertyKey,
      type: opts.type ?? tsType,
      primary: opts.primary ?? false,
      nullable: opts.nullable ?? false
    };
  };
}
