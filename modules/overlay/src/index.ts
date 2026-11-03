import { requireNativeModule } from 'expo-modules-core';

interface OverlayNativeModule {
  hasPermission(): boolean;
  requestPermission(): void;
  show(): Promise<void>;
  hide(): Promise<void>;
  setTrackedPackages(packages: string[]): void;
  getTrackedPackages(): string[];
  isAccessibilityEnabled(): boolean;
  openAccessibilitySettings(): void;
}

let Overlay: OverlayNativeModule | null = null;
try {
  Overlay = requireNativeModule<OverlayNativeModule>('Overlay');
} catch {
  Overlay = null;
}

export function hasOverlayPermission(): boolean {
  return Overlay?.hasPermission() ?? false;
}

export function requestOverlayPermission(): void {
  Overlay?.requestPermission();
}

export async function showOverlay(): Promise<void> {
  await Overlay?.show();
}

export async function hideOverlay(): Promise<void> {
  await Overlay?.hide();
}

export function setTrackedPackages(packages: string[]): void {
  Overlay?.setTrackedPackages(packages);
}

export function getTrackedPackages(): string[] {
  return Overlay?.getTrackedPackages() ?? [];
}

export function isAccessibilityEnabled(): boolean {
  return Overlay?.isAccessibilityEnabled() ?? false;
}

export function openAccessibilitySettings(): void {
  Overlay?.openAccessibilitySettings();
}