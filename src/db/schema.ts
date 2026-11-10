import * as SQLite from 'expo-sqlite';

/**
 * Current schema version. Bump this and add a migration block in
 * `ensureSchema` whenever the schema changes.
 */
const SCHEMA_VERSION = 2;

const CREATE_SELECTED_APPS_TABLE = `
  CREATE TABLE IF NOT EXISTS selected_apps (
    package_name TEXT PRIMARY KEY NOT NULL,
    label TEXT NOT NULL,
    is_social INTEGER NOT NULL DEFAULT 0 CHECK (is_social IN (0, 1))
  )
`;

const CREATE_PINKY_PROMISES_TABLE = `
  CREATE TABLE IF NOT EXISTS pinky_promises (
    package_name TEXT PRIMARY KEY NOT NULL,
    duration_seconds INTEGER NOT NULL CHECK (duration_seconds > 0)
  )
`;

/**
 * Applies schema migrations up to `SCHEMA_VERSION`.
 *
 * Safe to call on existing databases: statements use `IF NOT EXISTS` and the
 * `PRAGMA user_version` guard makes re-running a no-op.
 */
export async function ensureSchema(db: SQLite.SQLiteDatabase): Promise<void> {
  const versionRow = await db.getFirstAsync<{ user_version: number }>(
    'PRAGMA user_version',
  );
  const currentVersion = versionRow?.user_version ?? 0;

  if (currentVersion < 1) {
    await db.withTransactionAsync(async () => {
      await db.execAsync(CREATE_SELECTED_APPS_TABLE);
    });
    await db.execAsync('PRAGMA user_version = 1');
  }

  if (currentVersion < 2) {
    await db.withTransactionAsync(async () => {
      await db.execAsync(CREATE_PINKY_PROMISES_TABLE);
    });
    await db.execAsync(`PRAGMA user_version = ${SCHEMA_VERSION}`);
  }

  // Future migrations go here as additional `if (currentVersion < N)` blocks.
}
