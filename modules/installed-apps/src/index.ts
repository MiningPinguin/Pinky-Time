import { requireNativeModule } from 'expo-modules-core';

export interface NativeInstalledApp {
  packageName: string;
  label: string;
}

interface InstalledAppsNativeModule {
  getInstalledApps(): Promise<NativeInstalledApp[]>;
  getAppIcon(packageName: string): Promise<string>;
}

const InstalledApps = requireNativeModule<InstalledAppsNativeModule>('InstalledApps');

export async function getInstalledApps(): Promise<NativeInstalledApp[]> {
  return InstalledApps.getInstalledApps();
}

export async function getAppIcon(packageName: string): Promise<string> {
  return InstalledApps.getAppIcon(packageName);
}
