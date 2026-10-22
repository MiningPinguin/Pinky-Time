import { requireNativeModule } from 'expo-modules-core';

export interface NativeInstalledApp {
  packageName: string;
  label: string;
  icon: string;
}

interface InstalledAppsNativeModule {
  getInstalledApps(): Promise<NativeInstalledApp[]>;
}

const InstalledApps = requireNativeModule<InstalledAppsNativeModule>('InstalledApps');

export async function getInstalledApps(): Promise<NativeInstalledApp[]> {
  return InstalledApps.getInstalledApps();
}