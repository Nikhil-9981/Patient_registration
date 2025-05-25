// src/db.ts

import 'reflect-metadata';     // ← load the decorator polyfill first
import './entities/Patient';   // ← import your entity so @Entity/@Column run

import { PGlite } from '@electric-sql/pglite';
import { electricSync } from '@electric-sql/pglite-sync';
import { syncSchema } from './orm/schema';

export const dbPromise = (async () => {
  const db = await PGlite.create({
    url: 'idb://patient-db',    // correct key for IndexedDB persistence
    relaxedDurability: false,   // force synchronous flush to disk
    extensions: { electric: electricSync() }
  });

  // Now that your Patient metadata is registered, this will create "patients"
  await syncSchema(db);

  console.log('PGlite + schema + sync ready');
  return db;
})();
