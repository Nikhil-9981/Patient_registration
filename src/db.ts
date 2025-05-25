// src/db.ts
import { PGlite } from '@electric-sql/pglite';
import { electricSync } from '@electric-sql/pglite-sync';

// 1. Create the PGlite instance (IndexedDB persistence)
const db = new PGlite('idb://patient-db');

// 2. Wait until the WASM bundle is loaded & DB is initialized
await db.ready;

// 3. Add the ElectricSQL sync plugin for real-time, multi-tab sync
db.extend({
  electric: electricSync()
});

// 4. Export the fully-initialized DB
export default db;
