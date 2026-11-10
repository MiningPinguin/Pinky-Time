import { upsertPinkyPromise } from '@/db/repositories/pinkyPromisesRepository';

/**
 * Domain API for the times the user Pinky-Promised in the overlay prompt.
 * Persistence is delegated to the pinky-promises repository; this layer
 * owns the domain vocabulary (save), not SQL.
 */
export async function savePinkyPromise(
  packageName: string,
  durationSeconds: number,
): Promise<void> {
  await upsertPinkyPromise(packageName, durationSeconds);
}
