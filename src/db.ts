// src/db.ts
import { PGlite } from '@electric-sql/pglite';
import { electricSync } from '@electric-sql/pglite-sync';

const db = new PGlite('idb://patient-db');

db.waitReady
  .then(() => {
    // bypass TS checking:
    ;(db as any).extend({ electric: electricSync() });
    console.log('PGlite + sync ready');
  })
  .catch(err => {
    console.error('Failed to init PGlite:', err);
  });

export default db;
