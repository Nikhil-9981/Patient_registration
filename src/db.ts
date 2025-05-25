 // src/db.ts
import { PGlite } from '@electric-sql/pglite';

const db = new PGlite('idb://patient-db'); // persists to IndexedDB

db.ready
  .then(() => {
    // DB is fully initialized—any buffered queries will now run
    console.log('PGlite ready');
  })
  .catch(err => {
    console.error('PGlite failed to initialize:', err);
  });

export default db;
