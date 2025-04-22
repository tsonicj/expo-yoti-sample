Pod::Spec.new do |s|
  s.name           = 'YotiDocScanExpo'
  s.version        = '1.0.0'
  s.summary        = 'A sample project summary'
  s.description    = 'A sample project description'
  s.author         = ''
  s.homepage       = 'https://docs.expo.dev/modules/'
  s.platforms      = {
    :ios => '15.1',
    :tvos => '15.1'
  }
  s.source         = { git: '' }
  s.static_framework = true

  s.dependency 'ExpoModulesCore'
  
  s.dependency 'YotiSDKCore',               '6.1.0'
  s.dependency 'YotiDocumentScan',          '6.1.0'
  s.dependency 'YotiNFC',                   '6.1.0'
  s.dependency 'YotiSDKIdentityDocument',   '6.1.0'
  s.dependency 'YotiSDKSupplementaryDocument','6.1.0'
  s.dependency 'YotiSDKFaceTec',            '6.1.0'
  s.dependency 'YotiSDKFaceCapture',        '6.1.0'

  # Swift/Objective-C compatibility
  s.pod_target_xcconfig = {
    'DEFINES_MODULE' => 'YES',
  }

  s.source_files = "**/*.{h,m,mm,swift,hpp,cpp}"
end
