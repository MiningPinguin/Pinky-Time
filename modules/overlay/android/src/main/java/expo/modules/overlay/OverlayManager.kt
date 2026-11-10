package expo.modules.overlay

import android.content.Context
import android.os.Bundle
import android.os.Handler
import android.os.Looper
import android.view.View
import android.view.WindowManager
import com.facebook.react.ReactApplication
import com.facebook.react.ReactHost
import com.facebook.react.common.LifecycleState
import com.facebook.react.interfaces.fabric.ReactSurface

object OverlayManager {
  // Only ever touched on the main thread.
  private var overlayView: View? = null
  // Only ever touched on the main thread.
  private var overlaySurface: ReactSurface? = null

  // Thread-safe: may be read from background threads (accessibility service, JS module).
  @Volatile
  private var showPending = false

  private val mainHandler = Handler(Looper.getMainLooper())

  /**
   * Fabric flushes pending mount items from a Choreographer callback that React re-arms on
   * onHostResume() and cancels on onHostPause(). When a tracked app is foregrounded, PinkyTime's
   * activity is paused, so a surface started by the accessibility service would never receive its
   * JS-rendered views (blank/white overlay). Wake the host temporarily so mounting proceeds.
   */
  private var resumeRequestedByOverlay = false

  private fun wakeUpReactHostIfNeeded(reactHost: ReactHost) {
    if (reactHost.lifecycleState == LifecycleState.RESUMED) return
    reactHost.onHostResume(null)
    resumeRequestedByOverlay = true
  }

  /** Called when PinkyTime itself comes to the foreground (its activity resumes the host anyway). */
  fun onOwnAppCameToForeground() {
    resumeRequestedByOverlay = false
  }

  // All mutation of the overlay must happen on the main thread. Views created on a
  // background thread (e.g. Expo's AsyncFunctionQueue) crash later with
  // "Only the original thread that created a view hierarchy can touch its views."
  private inline fun runOnMainThread(crossinline block: () -> Unit) {
    if (Looper.myLooper() == Looper.getMainLooper()) {
      block()
    } else {
      mainHandler.post { block() }
    }
  }

  fun isShowing(): Boolean = showPending

  fun show(
    context: Context,
    appName: String? = null,
    packageName: String? = null,
  ) {
    runOnMainThread { showInternal(context, appName, packageName) }
  }

  fun hide(context: Context?) {
    runOnMainThread { hideInternal(context) }
  }

  private fun showInternal(context: Context, appName: String?, packageName: String?) {
    android.util.Log.d("PinkyOverlay", "show called, appName=$appName, isShowing=${overlayView != null}")
    if (overlayView != null) {
      android.util.Log.d("PinkyOverlay", "already showing, skipping")
      return
    }
    if (android.os.Build.VERSION.SDK_INT < android.os.Build.VERSION_CODES.M) {
      android.util.Log.d("PinkyOverlay", "SDK < M, skipping")
      showPending = false
      return
    }
    if (!android.provider.Settings.canDrawOverlays(context)) {
      android.util.Log.d("PinkyOverlay", "no overlay permission, skipping")
      showPending = false
      return
    }
    if (android.os.Build.VERSION.SDK_INT < android.os.Build.VERSION_CODES.O) {
      android.util.Log.d("PinkyOverlay", "SDK < O, skipping")
      showPending = false
      return
    }

    val windowManager = context.getSystemService(Context.WINDOW_SERVICE) as WindowManager

    val surfaceResult = createSurfaceView(context, appName, packageName)
    android.util.Log.d("PinkyOverlay", "surfaceResult=${surfaceResult != null}")
    if (surfaceResult == null) {
      // Fallback to a simple native placeholder if React isn't available.
      val fallback = android.widget.LinearLayout(context).apply {
        orientation = android.widget.LinearLayout.VERTICAL
        setBackgroundColor(android.graphics.Color.parseColor("#2A1B3D"))
        setPadding(48, 48, 48, 48)
      }
      val label = android.widget.TextView(context).apply {
        text = "PinkyTime overlay"
        setTextColor(android.graphics.Color.WHITE)
        textSize = 18f
      }
      fallback.addView(label)
      val hideButton = android.widget.Button(context).apply {
        text = "Hide"
        setOnClickListener { removeOverlay(windowManager) }
      }
      fallback.addView(hideButton)

      val params = WindowManager.LayoutParams(
        WindowManager.LayoutParams.WRAP_CONTENT,
        WindowManager.LayoutParams.WRAP_CONTENT,
        WindowManager.LayoutParams.TYPE_APPLICATION_OVERLAY,
        WindowManager.LayoutParams.FLAG_NOT_FOCUSABLE or
          WindowManager.LayoutParams.FLAG_NOT_TOUCH_MODAL or
          WindowManager.LayoutParams.FLAG_LAYOUT_IN_SCREEN,
        android.graphics.PixelFormat.TRANSLUCENT,
      ).apply {
        gravity = android.view.Gravity.CENTER
      }

      windowManager.addView(fallback, params)
      overlayView = fallback
      showPending = true
      return
    }

    val (view, surface) = surfaceResult

    val density = context.resources.displayMetrics.density
    val container = android.widget.FrameLayout(context).apply {
      // Slightly transparent full-screen background so the app underneath is faintly visible.
      // Adjust the leading hex digits (0xE6 ≈ 90% opaque) to change how much shows through.
      setBackgroundColor(android.graphics.Color.parseColor("#E6111827"))
      setPadding(
        (24 * density).toInt(),
        (24 * density).toInt(),
        (24 * density).toInt(),
        (24 * density).toInt(),
      )
    }
    container.addView(
      view,
      android.widget.FrameLayout.LayoutParams(
        android.view.ViewGroup.LayoutParams.MATCH_PARENT,
        android.view.ViewGroup.LayoutParams.WRAP_CONTENT,
        android.view.Gravity.CENTER,
      ),
    )

    // Full-screen window covering the whole display.
    val params = WindowManager.LayoutParams(
      WindowManager.LayoutParams.MATCH_PARENT,
      WindowManager.LayoutParams.MATCH_PARENT,
      WindowManager.LayoutParams.TYPE_APPLICATION_OVERLAY,
      WindowManager.LayoutParams.FLAG_NOT_FOCUSABLE or
        WindowManager.LayoutParams.FLAG_NOT_TOUCH_MODAL or
        WindowManager.LayoutParams.FLAG_LAYOUT_IN_SCREEN,
      android.graphics.PixelFormat.TRANSLUCENT,
    )

    try {
      windowManager.addView(container, params)
      showPending = true
    } catch (e: Exception) {
      android.util.Log.e("PinkyOverlay", "addView (react) failed", e)
      showPending = false
      return
    }
    overlayView = container
    overlaySurface = surface
  }

  private fun hideInternal(context: Context?) {
    // No early return on !showPending: show may still be queued behind this call
    // (same FIFO handler), so we must consume the pending state synchronously.
    showPending = false
    val windowManager = context?.getSystemService(Context.WINDOW_SERVICE) as? WindowManager
    removeOverlay(windowManager)
    restoreHostLifecycle(context)
  }

  private fun restoreHostLifecycle(context: Context?) {
    if (!resumeRequestedByOverlay) return
    resumeRequestedByOverlay = false
    (context?.applicationContext as? ReactApplication)?.reactHost?.onHostPause()
  }

  private fun createSurfaceView(
    context: Context,
    appName: String?,
    packageName: String?,
  ): Pair<View, ReactSurface>? {
    val reactHost = (context.applicationContext as? ReactApplication)?.reactHost ?: return null
    wakeUpReactHostIfNeeded(reactHost)

    // Prefer the live ReactContext (same context the JS-triggered path uses) when creating the
    // surface; a surface rooted in a bare Service context has no themed React environment.
    val surfaceContext = reactHost.currentReactContext ?: context

    val initialProps = Bundle().apply {
      if (appName != null) putString("appName", appName)
      if (packageName != null) putString("packageName", packageName)
    }

    val surface = reactHost.createSurface(surfaceContext, "OverlayPrompt", initialProps)
    val view = surface.view ?: return null
    surface.start()
    return Pair(view, surface)
  }

  private fun removeOverlay(windowManager: WindowManager?) {
    overlaySurface?.let { surface ->
      try {
        surface.stop()
      } catch (_: Exception) {
        // Ignore cleanup errors.
      }
    }
    overlaySurface = null

    overlayView?.let { v ->
      try {
        windowManager?.removeView(v)
      } catch (_: Exception) {
        // View may already be detached; ignore.
      }
    }
    overlayView = null
  }
}