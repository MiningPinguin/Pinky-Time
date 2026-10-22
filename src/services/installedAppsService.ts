import { Platform } from 'react-native';

import { getInstalledApps as getNativeInstalledApps } from 'installed-apps';

import type { InstalledApp } from '../types/InstalledApp';

/**
 * Android package names of the social apps PinkyTime tracks, in the order they
 * should be pinned to the top of the installed-apps list.
 */
const SOCIAL_PACKAGES: readonly string[] = [
  'com.facebook.katana',
  'com.facebook.orca',
  'com.instagram.android',
  'com.whatsapp',
  'com.twitter.android',
  'com.zhiliaoapp.musically',
  'com.ss.android.ugc.trill',
  'com.snapchat.android',
  'org.telegram.messenger',
  'com.linkedin.android',
];

/**
 * Returns the apps the user can launch on this device, with the tracked social
 * apps pinned to the top. On non-Android platforms (and if the native module is
 * unavailable) this resolves to an empty list.
 */
export async function getInstalledApps(): Promise<InstalledApp[]> {
  if (Platform.OS !== 'android') {
    return [];
  }

  try {
    const nativeApps = await getNativeInstalledApps();
    const mapped: InstalledApp[] = nativeApps.map((app) => ({
      packageName: app.packageName,
      label: app.label,
      icon: app.icon,
      isSocial: SOCIAL_PACKAGES.includes(app.packageName),
    }));

    const socials = mapped
      .filter((app) => app.isSocial)
      .sort(
        (a, b) =>
          SOCIAL_PACKAGES.indexOf(a.packageName) -
          SOCIAL_PACKAGES.indexOf(b.packageName),
      );
    const others = mapped
      .filter((app) => !app.isSocial)
      .sort((a, b) => a.label.localeCompare(b.label));

    return [...socials, ...others];
  } catch {
    return [];
  }
}