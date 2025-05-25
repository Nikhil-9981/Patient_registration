// src/orm/repository.ts
import type { Patient } from '../entities/Patient';
import { dbPromise } from '../db';

/** Helper to run and log exec() or query() calls */
async function runSql(sql: string, params: any[] = []) {
  const db = await dbPromise;
  console.log('[repo] SQL:', sql, params);
  try {
    if (params.length > 0) {
      // Use query() for parameterized statements
      await db.query(sql, params);
    } else {
      // Use exec() for raw / batch SQL
      await db.exec(sql);
    }
  } catch (err) {
    console.error('[repo] SQL FAILED:', sql, params, err);
    throw err;
  }
}

/**
 * Insert a new patient record.
 */
export async function addPatient(p: Patient): Promise<void> {
  await runSql(
    `INSERT INTO "patients" (id, name, age) VALUES ($1, $2, $3);`,
    [p.id, p.name, p.age ?? null]
  );
}

/**
 * Fetch all patients.
 */
export async function getAllPatients(): Promise<Patient[]> {
  const db = await dbPromise;
  const result = await db.query<{ id: string; name: string; age: number | null }>(
    `SELECT id, name, age FROM "patients";`
  );
  return result.rows.map((r: { id: string; name: string; age: number | null }) => ({
    id:   r.id,
    name: r.name,
    age:  r.age === null ? undefined : r.age
  }));
}

/**
 * Update a patient’s name and/or age.
 */
export async function updatePatient(
  id: string,
  fields: Partial<Pick<Patient, 'name' | 'age'>>
): Promise<void> {
  const sets: string[] = [];
  const params: any[] = [];
  let idx = 1;

  if (fields.name !== undefined) {
    sets.push(`name = $${idx++}`);
    params.push(fields.name);
  }
  if (fields.age !== undefined) {
    sets.push(`age  = $${idx++}`);
    params.push(fields.age);
  }
  if (sets.length === 0) return;

  params.push(id);
  const sql = `UPDATE "patients" SET ${sets.join(', ')} WHERE id = $${idx};`;
  await runSql(sql, params);
}

/**
 * Delete a patient by ID.
 */
export async function deletePatient(id: string): Promise<void> {
  await runSql(
    `DELETE FROM "patients" WHERE id = $1;`,
    [id]
  );
}
