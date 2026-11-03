package expo.modules.overlay

import android.content.Context
import android.graphics.Color
import android.graphics.PixelFormat
import android.os.Build
import android.provider.Settings
import android.view.Gravity
import android.view.View
import android.view.WindowManager
import android.widget.Button
import android.widget.LinearLayout
import android.widget.TextView

object OverlayManager {
  private var overlayView: View? = null

  fun show(context: Context) {
    if (overlayView != null) return
    if (Build.VERSION.SDK_INT < Build.VERSION_CODES.M || !Settings.canDrawOverlays(context)) return
    if (Build.VERSION.SDK_INT < Build.VERSION_CODES.O) return

    val windowManager = context.getSystemService(Context.WINDOW_SERVICE) as WindowManager

    val container = LinearLayout(context).apply {
      orientation = LinearLayout.VERTICAL
      setBackgroundColor(Color.parseColor("#2A1B3D"))
      setPadding(48, 48, 48, 48)
    }

    val label = TextView(context).apply {
      text = "PinkyTime overlay"
      setTextColor(Color.WHITE)
      textSize = 18f
    }
    container.addView(label)

    val hideButton = Button(context).apply {
      text = "Hide"
      setOnClickListener { removeOverlay(windowManager) }
    }
    container.addView(hideButton)

    val params = WindowManager.LayoutParams(
      WindowManager.LayoutParams.WRAP_CONTENT,
      WindowManager.LayoutParams.WRAP_CONTENT,
      WindowManager.LayoutParams.TYPE_APPLICATION_OVERLAY,
      WindowManager.LayoutParams.FLAG_NOT_FOCUSABLE or
        WindowManager.LayoutParams.FLAG_NOT_TOUCH_MODAL or
        WindowManager.LayoutParams.FLAG_LAYOUT_IN_SCREEN,
      PixelFormat.TRANSLUCENT,
    ).apply {
      gravity = Gravity.CENTER
    }

    windowManager.addView(container, params)
    overlayView = container
  }

  fun hide(context: Context?) {
    val windowManager = context?.getSystemService(Context.WINDOW_SERVICE) as? WindowManager
    removeOverlay(windowManager)
  }

  fun isShowing(): Boolean = overlayView != null

  private fun removeOverlay(windowManager: WindowManager?) {
    overlayView?.let { view ->
      try {
        windowManager?.removeView(view)
      } catch (_: Exception) {
        // View may already be detached; ignore.
      }
    }
    overlayView = null
  }
}