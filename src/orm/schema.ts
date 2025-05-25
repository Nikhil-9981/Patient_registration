// src/orm/schema.ts
import { getAllEntities } from './metadata';
import type { ColumnMetadata } from './metadata';

/** Map TS types to SQLite types (defaulting to text) */
function mapType(tsType: string): string {
  const t = tsType.toLowerCase();
  switch (t) {
    case 'number':  return 'integer';
    case 'string':  return 'text';
    case 'boolean': return 'boolean';
    case 'date':    return 'timestamp';
    default:        return 'text';
  }
}

/**
 * Create tables for all entities on the given DB instance.
 */
export async function syncSchema(db: any): Promise<void> {
  const entities = getAllEntities();

  for (const meta of entities) {
    const cols = Object.values(meta.columns)
      .map((col: ColumnMetadata) => {
        let sqlType = mapType(col.type);
        let colDef = `"${col.name}" ${sqlType}`;
        if (col.primary)   colDef += ' PRIMARY KEY';
        if (!col.nullable) colDef += ' NOT NULL';
        return colDef;
      })
      .join(', ');

    const sql = `CREATE TABLE IF NOT EXISTS "${meta.tableName}" (${cols});`;
    console.log('[schema] executing:', sql);
    await db.exec(sql);
  }
}
