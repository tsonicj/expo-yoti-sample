import ExpoModulesCore
import YotiSDKCore
import YotiDocumentScan
import YotiNFC
import YotiSDKIdentityDocument
import YotiSDKSupplementaryDocument
import YotiSDKFaceTec
import YotiSDKFaceCapture

public class YotiDocScanExpoModule: Module {
  // Each module class must implement the definition function. The definition consists of components
  // that describes the module's functionality and behavior.
  // See https://docs.expo.dev/modules/module-api for more details about available components.
  public func definition() -> ModuleDefinition {
    // Sets the name of the module that JavaScript code will use to refer to the module. Takes a string as an argument.
    // Can be inferred from module's class name, but it's recommended to set it explicitly for clarity.
    // The module will be accessible from `requireNativeModule('YotiDocScanExpo')` in JavaScript.
    Name("YotiDocScanExpo")

    AsyncFunction("startSession") { (sessionId: String, clientSessionToken: String, promise: Promise) in
        DispatchQueue.main.async {
            do {
                guard let viewController = WindowRootViewController() else {
                    promise.reject("VIEW_CONTROLLER_ERROR", "Could not get root view controller")
                    return
                }
                
                let navigationController = YotiSDKNavigationController()
                let dataSource = YotiSessionDataSource(sessionId: sessionId, sessionToken: clientSessionToken)
                navigationController.sdkDataSource = dataSource
                
                // Set theme colors using hex values
                let primaryColor = UIColor(red: 0x00/255.0, green: 0xE4/255.0, blue: 0xF5/255.0, alpha: 1.0) // #00E4F5 Blue
                let accentColor = UIColor(red: 0x00/255.0, green: 0x28/255.0, blue: 0x46/255.0, alpha: 1.0) // #002846 Darker blue


                let secondaryColor = UIColor(
                    red: CGFloat(0x00) / 255.0,
                    green: CGFloat(0x80) / 255.0,
                    blue: CGFloat(0x9C) / 255.0,
                    alpha: 1.0
                )
                // Apply colors using appearance proxy if direct properties aren't available
                UINavigationBar.appearance().tintColor = primaryColor
                UINavigationBar.appearance().barTintColor = secondaryColor

                if #available(iOS 13.0, *) {
                    let appearance = UINavigationBarAppearance()
                    appearance.backgroundColor = secondaryColor
                    UINavigationBar.appearance().standardAppearance = appearance
                    UINavigationBar.appearance().scrollEdgeAppearance = appearance
                }
                
                // Create delegate and retain it strongly
                let delegate = YotiSessionDelegate(promise: promise)
                // Store delegate as associated object to prevent deallocation
                objc_setAssociatedObject(navigationController, "delegateKey", delegate, .OBJC_ASSOCIATION_RETAIN)
                navigationController.sdkDelegate = delegate
                
                navigationController.modalPresentationStyle = .fullScreen
                
                viewController.present(navigationController, animated: true) { 
                    print("Navigation controller presented successfully")
                }
            } catch {
                print("Error initializing Yoti SDK: \(error.localizedDescription)")
                promise.reject("YOTI_INIT_ERROR", "Failed to initialize Yoti SDK: \(error.localizedDescription)")
            }
        }
    }

    // Enables the module to be used as a native view. Definition components that are accepted as part of the
    // view definition: Prop, Events.
    View(YotiDocScanExpoView.self) {
      // Defines a setter for the `url` prop.
      Prop("url") { (view: YotiDocScanExpoView, url: URL) in
        if view.webView.url != url {
          view.webView.load(URLRequest(url: url))
        }
      }

      Events("onLoad")
    }
  }
}

private class YotiSessionDataSource: NSObject, YotiSDKDataSource {
    private let sessionId: String
    private let sessionToken: String
    
    init(sessionId: String, sessionToken: String) {
        self.sessionId = sessionId
        self.sessionToken = sessionToken
    }
    
    func sessionID(for navigationController: YotiSDKNavigationController) -> String {
        return sessionId
    }
    
    func sessionToken(for navigationController: YotiSDKNavigationController) -> String {
        return sessionToken
    }
    
    func supportedModuleTypes(for navigationController: YotiSDKNavigationController) -> [YotiSDKModule.Type] {
        return [
            YotiSDKIdentityDocumentModule.self,
            YotiSDKFaceTecModule.self,
            YotiSDKSupplementaryDocumentModule.self,
            YotiSDKFaceCaptureModule.self
        ]
    }
}

private class YotiSessionDelegate: NSObject, YotiSDKDelegate {
    private let promise: Promise
    
    init(promise: Promise) {
        self.promise = promise
        super.init()
        print("YotiSessionDelegate initialized")
    }
    
    deinit {
        print("YotiSessionDelegate being deallocated!")
    }
    
    func navigationController(_ navigationController: YotiSDKNavigationController, didFinishWithResult result: YotiSDKResult) {
        print("Session finished with result")
        navigationController.dismiss(animated: true) {
            switch result {
            case .success:
                print("Session finished with success")
                self.promise.resolve([
                    "success": true,
                    "sessionStatusCode": 0,
                    "sessionStatusDescription": "Success"
                ])
            case .failure(let error):
                print("Session finished with failure: \(error.localizedDescription)")
                let errorCode = (error as NSError).code
                self.promise.reject(
                    String(errorCode),
                    error.localizedDescription
                )
            }
        }
    }
}

private func WindowRootViewController() -> UIViewController? {
    let scene = UIApplication.shared.connectedScenes.first as? UIWindowScene
    return scene?.windows.first?.rootViewController
}
