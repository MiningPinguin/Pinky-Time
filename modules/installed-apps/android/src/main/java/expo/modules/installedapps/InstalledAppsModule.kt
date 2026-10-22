package expo.modules.installedapps

import android.content.Intent
import android.content.pm.PackageManager
import android.graphics.Bitmap
import android.graphics.Canvas
import android.graphics.drawable.BitmapDrawable
import android.graphics.drawable.Drawable
import android.util.Base64
import expo.modules.kotlin.modules.Module
import expo.modules.kotlin.modules.ModuleDefinition
import java.io.ByteArrayOutputStream

class InstalledAppsModule : Module() {
  override fun definition() = ModuleDefinition {
    Name("InstalledApps")

    AsyncFunction("getInstalledApps") {
      val context = appContext.reactContext
        ?: throw IllegalStateException("React context is not available")
      val packageManager = context.packageManager
      val launcherIntent = Intent(Intent.ACTION_MAIN).addCategory(Intent.CATEGORY_LAUNCHER)

      val seenPackages = mutableSetOf<String>()
      val apps = mutableListOf<Map<String, Any>>()

      for (resolveInfo in packageManager.queryIntentActivities(launcherIntent, 0)) {
        val appInfo = resolveInfo.activityInfo.applicationInfo
        val packageName = appInfo.packageName
        if (packageName == context.packageName) continue
        if (!seenPackages.add(packageName)) continue

        val label = packageManager.getApplicationLabel(appInfo).toString()

        apps.add(
          mapOf(
            "packageName" to packageName,
            "label" to label,
          ),
        )
      }

      apps
    }

    AsyncFunction("getAppIcon") { packageName: String ->
      val context = appContext.reactContext
        ?: throw IllegalStateException("React context is not available")
      val packageManager = context.packageManager
      try {
        val appInfo = packageManager.getApplicationInfo(packageName, 0)
        drawableToBase64(packageManager.getApplicationIcon(appInfo))
      } catch (error: Exception) {
        ""
      }
    }
  }

  private fun drawableToBase64(drawable: Drawable): String {
    val bitmap = if (drawable is BitmapDrawable) {
      drawable.bitmap
    } else {
      val width = if (drawable.intrinsicWidth > 0) drawable.intrinsicWidth else 48
      val height = if (drawable.intrinsicHeight > 0) drawable.intrinsicHeight else 48
      val created = Bitmap.createBitmap(width, height, Bitmap.Config.ARGB_8888)
      val canvas = Canvas(created)
      drawable.setBounds(0, 0, canvas.width, canvas.height)
      drawable.draw(canvas)
      created
    }

    val stream = ByteArrayOutputStream()
    bitmap.compress(Bitmap.CompressFormat.PNG, 100, stream)
    return "data:image/png;base64," +
      Base64.encodeToString(stream.toByteArray(), Base64.NO_WRAP)
  }
}
