import { Platform } from 'react-native';

import type { InstalledApp } from '../types/InstalledApp';

// The `installed-apps` module is native-only. Importing it on web (or in
// Storybook) executes `requireNativeModule`, which throws. Load it lazily and
// guard with try/catch so non-native platforms degrade gracefully.
type NativeInstalledApp = { packageName: string; label: string };

let nativeGetInstalledApps: (() => Promise<NativeInstalledApp[]>) | null = null;
let nativeGetAppIcon: ((packageName: string) => Promise<string>) | null = null;

if (Platform.OS === 'android') {
  try {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const mod = require('installed-apps');
    nativeGetInstalledApps = mod.getInstalledApps;
    nativeGetAppIcon = mod.getAppIcon;
  } catch {
    nativeGetInstalledApps = null;
    nativeGetAppIcon = null;
  }
}

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
    if (nativeGetInstalledApps === null) {
      return [];
    }
    const nativeApps = await nativeGetInstalledApps();
    const mapped: InstalledApp[] = nativeApps.map((app) => ({
      packageName: app.packageName,
      label: app.label,
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
/**
 * Loads the icon (base64 data URI) for a single installed app. Resolves to an
 * empty string if the icon cannot be rendered or on non-Android platforms.
 */
export async function getAppIcon(packageName: string): Promise<string> {
  if (Platform.OS !== 'android') {
    return '';
  }

  try {
    if (nativeGetAppIcon === null) {
      return '';
    }
    return await nativeGetAppIcon(packageName);
  } catch {
    return '';
  }
}
