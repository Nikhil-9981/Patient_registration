// **src/db.ts** – Initialize PGlite with persistent IndexedDB and strict durability
import { PGlite } from '@electric-sql/pglite';
import { electricSync } from '@electric-sql/pglite-sync';
import { syncSchema } from './orm/schema';

export const dbPromise = (async () => {
  // Create PGlite with an IndexedDB data directory and disable relaxed durability
  const db = await PGlite.create({
    url: 'idb://patient-db',       // Use IndexedDB persistence:contentReference[oaicite:7]{index=7}
    relaxedDurability: false,          // Flush to disk after each query (synchronous):contentReference[oaicite:8]{index=8}
    extensions: {
      electric: electricSync()
    }
  });

  // Apply database schema (create tables) on first load
  await syncSchema(db);
  console.log('PGlite + schema + sync ready');
  return db;
})();
