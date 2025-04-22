package expo.modules.yotidocscanexpo

import android.app.Activity
import android.util.Log
import expo.modules.kotlin.modules.Module
import expo.modules.kotlin.modules.ModuleDefinition
import java.net.URL
import com.yoti.mobile.android.yotisdkcore.YotiSdk
import com.yoti.mobile.android.yotisdkcore.YOTI_SDK_REQUEST_CODE
import expo.modules.kotlin.Promise

class YotiDocScanExpoModule : Module() {

  private var yotiSdk: YotiSdk? = null
  private var currentPromise: Promise? = null
  private val REQUEST_CODE_DOC_SCAN = 1001

  override fun definition() = ModuleDefinition {
    Name("YotiDocScanExpo")

    OnCreate {
      (appContext.currentActivity as? Activity)?.let { activity ->
        yotiSdk = YotiSdk(activity).configureReactNativeClient()
        Log.d("YotiDocScanExpo", "SDK initialized")
      }
    }

    AsyncFunction("startSession") { sessionId: String, clientSessionToken: String, promise: Promise ->
      val activity = appContext.currentActivity
      if (activity == null) {
        promise.reject("ERROR_NO_ACTIVITY", "Activity doesn't exist", null)
        return@AsyncFunction
      }
      if (yotiSdk == null) {
        try {
          yotiSdk = YotiSdk(activity).configureReactNativeClient()
        } catch (e: Exception) {
          promise.reject("ERROR_SDK_NOT_INITIALIZED", e.message ?: "Failed to init SDK", e)
          return@AsyncFunction
        }
      }
      currentPromise = promise
      val started = yotiSdk!!
        .setSessionId(sessionId)
        .setClientSessionToken(clientSessionToken)
        .start(activity)

      if (!started) {
        val code = yotiSdk?.sessionStatusCode ?: -1
        val desc = yotiSdk?.sessionStatusDescription ?: "Unknown error"
        promise.reject(code.toString(), desc, null)
        currentPromise = null
      }
    }

    OnActivityResult { _, payload ->
      if (payload.requestCode != REQUEST_CODE_DOC_SCAN && payload.requestCode != YOTI_SDK_REQUEST_CODE) {
        return@OnActivityResult
      }
      val promise = currentPromise
      currentPromise = null

      val code = yotiSdk?.sessionStatusCode ?: -1
      val desc = yotiSdk?.sessionStatusDescription ?: "Unknown result"

      if (payload.resultCode == Activity.RESULT_OK) {
        Log.d("YotiDocScanExpo", "Success: $code – $desc")
        promise?.resolve(
          mapOf(
            "success" to true,
            "sessionStatusCode" to code,
            "sessionStatusDescription" to desc
          )
        )
      } else {
        Log.e("YotiDocScanExpo", "Failure: $code – $desc")
        promise?.reject(code.toString(), desc, null)
      }
    }

    View(YotiDocScanExpoView::class) {
      Prop("url") { view, url: URL ->
        view.webView.loadUrl(url.toString())
      }
      Events("onLoad")
    }
  }
}
