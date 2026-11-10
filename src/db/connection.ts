import * as SQLite from 'expo-sqlite';

import { ensureSchema } from './schema';

/**
 * App-wide SQLite connection. This module owns the database name/config and
 * the connection handle; schema definition lives in `schema.ts` and is
 * applied once on first open.
 */
const DB_NAME = 'pinky-time.db';

// The open promise, not the handle: concurrent first-time callers must share
// the same open + migration, otherwise their schema transactions interleave
// on the shared native connection ("cannot start a transaction within a
// transaction" / "cannot commit - no transaction is active").
let dbPromise: Promise<SQLite.SQLiteDatabase> | undefined;

/**
 * Returns the singleton SQLite connection, opening it lazily on first use
 * and applying the schema. Safe to call from any repository.
 */
export async function getDatabase(): Promise<SQLite.SQLiteDatabase> {
  if (!dbPromise) {
    dbPromise = (async () => {
      const connection = await SQLite.openDatabaseAsync(DB_NAME);
      await ensureSchema(connection);
      return connection;
    })();
  }
  return dbPromise;
}

/**
 * Closes the singleton connection, if open. Intended for tests/cleanup.
 */
export async function closeDatabase(): Promise<void> {
  if (dbPromise) {
    const connection = await dbPromise;
    await connection.closeAsync();
    dbPromise = undefined;
  }
}
