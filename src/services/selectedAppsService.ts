import {
  deleteSelectedApp,
  findAllSelectedApps,
  upsertSelectedApp,
} from '@/db/repositories/selectedAppsRepository';
import type { InstalledApp } from '@/types';

/**
 * Domain API for the apps the user ticked in `InstalledAppsList`.
 * Persistence is delegated to the selected-apps repository; this layer
 * owns the domain vocabulary (add/remove/get), not SQL.
 */
export async function addSelectedApp(app: InstalledApp): Promise<void> {
  await upsertSelectedApp(app);
}

export async function removeSelectedApp(packageName: string): Promise<void> {
  await deleteSelectedApp(packageName);
}

export async function getSelectedApps(): Promise<InstalledApp[]> {
  return findAllSelectedApps();
}
