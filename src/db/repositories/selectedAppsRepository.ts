import { getDatabase } from '@/db/connection';
import { InstalledApp } from '@/types';
import { SelectedAppRow } from '@/db/types/SelectedAppRow';

/**
 * SQLite persistence for the apps the user ticked in `InstalledAppsList`.
 *
 * Only queries and the row → domain mapping live here; table creation is
 * handled by the schema in `src/db/schema.ts`. Booleans stored as 0/1,
 * `package_name` is the primary key.
 */

function rowToApp(row: SelectedAppRow): InstalledApp {
  return {
    packageName: row.package_name,
    label: row.label,
    isSocial: row.is_social === 1,
  };
}

/**
 * Inserts the app under its package name, updating the existing row on
 * conflict instead of replacing it.
 */
export async function upsertSelectedApp(app: InstalledApp): Promise<void> {
  const db = await getDatabase();
  await db.runAsync(
    `INSERT INTO selected_apps (package_name, label, is_social)
     VALUES (?, ?, ?)
     ON CONFLICT(package_name) DO UPDATE SET
       label = excluded.label,
       is_social = excluded.is_social`,
    app.packageName,
    app.label,
    app.isSocial ? 1 : 0,
  );
}

/**
 * Deletes the app with the given package name, if present.
 */
export async function deleteSelectedApp(packageName: string): Promise<void> {
  const db = await getDatabase();
  await db.runAsync('DELETE FROM selected_apps WHERE package_name = ?', packageName);
}

/**
 * Returns every ticked app, mapped to the `InstalledApp` domain shape.
 * Ordered by label for deterministic UI.
 */
export async function findAllSelectedApps(): Promise<InstalledApp[]> {
  const db = await getDatabase();
  const rows = await db.getAllAsync<SelectedAppRow>(
    'SELECT package_name, label, is_social FROM selected_apps ORDER BY label COLLATE NOCASE',
  );

  return rows.map(rowToApp);
}
