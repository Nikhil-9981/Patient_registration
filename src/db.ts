// src/db.ts
import { PGlite } from '@electric-sql/pglite';
import { electricSync } from '@electric-sql/pglite-sync';
import { syncSchema } from './orm/schema';

export const dbPromise = (async () => {
  // 1) Create PGlite with sync plugin
  const db = await PGlite.create({
    url: 'idb://patient-db',
    extensions: {
      electric: electricSync()
    }
  });

  // 2) Generate & apply schema
  await syncSchema(db);

  console.log('PGlite + schema + sync ready');
  return db;
})();
