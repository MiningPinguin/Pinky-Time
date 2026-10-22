export interface InstalledApp {
  /** Android package name, e.g. `com.instagram.android`. */
  packageName: string;
  /** User-facing app label. */
  label: string;
  /** Whether this is one of the social apps PinkyTime tracks. */
  isSocial: boolean;
}