// src/orm/metadata.ts

export interface ColumnMetadata {
  name: string;
  type: string;
  primary?: boolean;
  nullable?: boolean;
}

export interface EntityMetadata {
  tableName: string;
  columns: Record<string, ColumnMetadata>;
}

// In-memory registry of all entities
const ENTITIES = new Map<Function, EntityMetadata>();

// Retrieve (or initialize) metadata for a class constructor
export function getEntityMetadata(target: Function): EntityMetadata {
  if (!ENTITIES.has(target)) {
    ENTITIES.set(target, {
      tableName: target.name.toLowerCase(),
      columns: {}
    });
  }
  return ENTITIES.get(target)!;
}

// For later: retrieve all registered entities
export function getAllEntities(): EntityMetadata[] {
  return Array.from(ENTITIES.values());
}
