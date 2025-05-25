// src/db.ts

// 1) Import your entity so the @Entity/@Column decorators run
import './entities/Patient';

import { PGlite } from '@electric-sql/pglite';
import { electricSync } from '@electric-sql/pglite-sync';
import { syncSchema } from './orm/schema';

export const dbPromise = (async () => {
  // 2) Create PGlite pointing at IndexedDB, with strict durability
  const db = await PGlite.create({
    url: 'idb://patient-db',        // ← correct key for IndexedDB persistence
    relaxedDurability: false,       // ← force synchronous flush to disk
    extensions: {
      electric: electricSync()      // ← multi-tab sync plugin
    }
  });

  // 3) Auto-generate & apply tables (now that metadata is registered)
  await syncSchema(db);

  console.log('PGlite + schema + sync ready');
  return db;
})();
