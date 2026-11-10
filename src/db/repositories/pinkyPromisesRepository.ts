import { getDatabase } from '@/db/connection';

/**
 * SQLite persistence for the times the user Pinky-Promised in the overlay
 * prompt.
 *
 * Only queries live here; table creation is handled by the schema in
 * `src/db/schema.ts`. `package_name` is the primary key, so every tracked
 * app keeps its own promise independently — saving one app's time never
 * overwrites another app's.
 */

/**
 * Inserts the promise under the app's package name, updating the existing
 * row on conflict instead of replacing it.
 */
export async function upsertPinkyPromise(
  packageName: string,
  durationSeconds: number,
): Promise<void> {
  const db = await getDatabase();
  await db.runAsync(
    `INSERT INTO pinky_promises (package_name, duration_seconds)
     VALUES (?, ?)
     ON CONFLICT(package_name) DO UPDATE SET
       duration_seconds = excluded.duration_seconds`,
    packageName,
    durationSeconds,
  );
}
