// src/db.ts
import { PGlite } from '@electric-sql/pglite';
import { electricSync } from '@electric-sql/pglite-sync';
import { syncSchema } from './orm/schema';

export const dbPromise = (async () => {
  // ⚠️ Use `url:` (not `dataDir:`) to point at IndexedDB
  const db = await PGlite.create({
    url: 'idb://patient-db',
    relaxedDurability: false,    // synchronous flushes to IndexedDB
    extensions: {
      electric: electricSync()
    }
  });

  // Create your tables before any query runs
  await syncSchema(db);
  console.log('PGlite + schema + sync ready');
  return db;
})();
