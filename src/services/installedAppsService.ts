import type { InstalledApp } from '../types/InstalledApp';

/**
 * Stub used on non-Android platforms (web, iOS) where the `installed-apps`
 * native module is unavailable. Returns no apps / no icons.
 */
export async function getInstalledApps(): Promise<InstalledApp[]> {
  return [];
}

export async function getAppIcon(_packageName: string): Promise<string> {
  return '';
}
