import { Platform } from 'react-native';

import {
  getSelectedApps,
} from './selectedAppsService';
import {
  hasOverlayPermission as nativeHasOverlayPermission,
  requestOverlayPermission as nativeRequestOverlayPermission,
  showOverlay as nativeShowOverlay,
  hideOverlay as nativeHideOverlay,
  setTrackedPackages as nativeSetTrackedPackages,
  getTrackedPackages as nativeGetTrackedPackages,
  isAccessibilityEnabled as nativeIsAccessibilityEnabled,
  openAccessibilitySettings as nativeOpenAccessibilitySettings,
} from 'overlay';

export function hasOverlayPermission(): boolean {
  if (Platform.OS !== 'android') return false;
  return nativeHasOverlayPermission();
}

export function requestOverlayPermission(): void {
  if (Platform.OS !== 'android') return;
  nativeRequestOverlayPermission();
}

export async function showOverlay(
  appName?: string,
  packageName?: string,
): Promise<void> {
  if (Platform.OS !== 'android') return;
  await nativeShowOverlay(appName, packageName);
}

export async function hideOverlay(): Promise<void> {
  if (Platform.OS !== 'android') return;
  await nativeHideOverlay();
}

export function setTrackedPackages(packages: string[]): void {
  if (Platform.OS !== 'android') return;
  nativeSetTrackedPackages(packages);
}

export function getTrackedPackages(): string[] {
  if (Platform.OS !== 'android') return [];
  return nativeGetTrackedPackages();
}

export function isAccessibilityEnabled(): boolean {
  if (Platform.OS !== 'android') return false;
  return nativeIsAccessibilityEnabled();
}

export function openAccessibilitySettings(): void {
  if (Platform.OS !== 'android') return;
  nativeOpenAccessibilitySettings();
}

export async function syncTrackedApps(): Promise<void> {
  if (Platform.OS !== 'android') return;
  const apps = await getSelectedApps();
  setTrackedPackages(apps.map((app) => app.packageName));
}