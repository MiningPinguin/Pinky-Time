package expo.modules.overlay

import android.accessibilityservice.AccessibilityService
import android.content.Context
import android.os.Build
import android.provider.Settings
import android.view.accessibility.AccessibilityEvent

class PinkyAccessibilityService : AccessibilityService() {
  override fun onAccessibilityEvent(event: AccessibilityEvent?) {
    if (event?.eventType != AccessibilityEvent.TYPE_WINDOW_STATE_CHANGED) return

    val packageName = event.packageName?.toString() ?: return
    if (packageName == this.packageName) {
      // PinkyTime itself is foregrounding; let its activity resume the React host naturally
      // instead of keeping our temporary "forced resume" bookkeeping around.
      OverlayManager.onOwnAppCameToForeground()
      return
    }

    val tracked = getTrackedPackages(this)
    if (packageName in tracked) {
      if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M && Settings.canDrawOverlays(this)) {
        val label = try {
          packageManager.getApplicationLabel(
            packageManager.getApplicationInfo(packageName, 0),
          ).toString()
        } catch (_: Exception) {
          packageName
        }
        OverlayManager.show(this, label, packageName)
      }
    } else if (OverlayManager.isShowing()) {
      OverlayManager.hide(this)
    }
  }

  override fun onInterrupt() {}

  private fun getTrackedPackages(context: Context): Set<String> {
    val prefs = context.getSharedPreferences("pinky_overlay", Context.MODE_PRIVATE)
    return prefs.getStringSet("tracked_packages", emptySet()) ?: emptySet()
  }
}