package expo.modules.overlay

import android.content.Context
import android.content.Intent
import android.net.Uri
import android.os.Build
import android.provider.Settings
import expo.modules.kotlin.modules.Module
import expo.modules.kotlin.modules.ModuleDefinition

class OverlayModule : Module() {
  override fun definition() = ModuleDefinition {
    Name("Overlay")

    Function("hasPermission") {
      val context = appContext.reactContext
        ?: return@Function false
      if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
        Settings.canDrawOverlays(context)
      } else {
        true
      }
    }

    Function("requestPermission") {
      val context = appContext.reactContext
        ?: return@Function null
      if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M && !Settings.canDrawOverlays(context)) {
        val intent = Intent(
          Settings.ACTION_MANAGE_OVERLAY_PERMISSION,
          Uri.parse("package:${context.packageName}"),
        )
        intent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK)
        context.startActivity(intent)
      }
      null
    }

    AsyncFunction("show") {
      val context = appContext.reactContext
        ?: throw IllegalStateException("React context is not available")
      OverlayManager.show(context)
      null
    }

    AsyncFunction("hide") {
      val context = appContext.reactContext
      OverlayManager.hide(context)
      null
    }

    Function("setTrackedPackages") { packages: List<String> ->
      val context = appContext.reactContext ?: return@Function null
      val prefs = context.getSharedPreferences("pinky_overlay", Context.MODE_PRIVATE)
      prefs.edit().putStringSet("tracked_packages", packages.toSet()).apply()
      null
    }

    Function("getTrackedPackages") {
      val context = appContext.reactContext ?: return@Function emptyList<String>()
      val prefs = context.getSharedPreferences("pinky_overlay", Context.MODE_PRIVATE)
      prefs.getStringSet("tracked_packages", emptySet<String>())?.toList() ?: emptyList<String>()
    }

    Function("isAccessibilityEnabled") {
      val context = appContext.reactContext ?: return@Function false
      val enabledServices = Settings.Secure.getString(
        context.contentResolver,
        Settings.Secure.ENABLED_ACCESSIBILITY_SERVICES,
      )
      val expected = "${context.packageName}/expo.modules.overlay.PinkyAccessibilityService"
      enabledServices?.contains(expected) == true
    }

    Function("openAccessibilitySettings") {
      val context = appContext.reactContext ?: return@Function null
      val intent = Intent(Settings.ACTION_ACCESSIBILITY_SETTINGS)
      intent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK)
      context.startActivity(intent)
      null
    }
  }
}