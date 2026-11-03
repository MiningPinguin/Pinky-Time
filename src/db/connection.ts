import * as SQLite from 'expo-sqlite';

import { ensureSchema } from './schema';

/**
 * App-wide SQLite connection. This module owns the database name/config and
 * the connection handle; schema definition lives in `schema.ts` and is
 * applied once on first open.
 */
const DB_NAME = 'pinky-time.db';

let db: SQLite.SQLiteDatabase | undefined;

/**
 * Returns the singleton SQLite connection, opening it lazily on first use
 * and applying the schema. Safe to call from any repository.
 */
export async function getDatabase(): Promise<SQLite.SQLiteDatabase> {
  if (!db) {
    db = await SQLite.openDatabaseAsync(DB_NAME);
    await ensureSchema(db);
  }
  return db;
}

/**
 * Closes the singleton connection, if open. Intended for tests/cleanup.
 */
export async function closeDatabase(): Promise<void> {
  if (db) {
    await db.closeAsync();
    db = undefined;
  }
}
