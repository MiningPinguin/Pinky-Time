export interface InstalledApp {
  /** Android package name, e.g. `com.instagram.android`. */
  packageName: string;
  /** User-facing app label. */
  label: string;
  /** Base64 PNG data URI for the app icon, or empty string if unavailable. */
  icon: string;
  /** Whether this is one of the social apps PinkyTime tracks. */
  isSocial: boolean;
}