export default () => {
  return {
    assetBundlePatterns: ['**/*'], // This ensures all assets (including fonts) are bundled
    name: 'yotiExpoSample',
    slug: 'yotiExpoSample',
    version: '1.0.0',
    orientation: 'portrait',
    icon: './assets/images/icon.png',
    scheme: 'myapp',
    userInterfaceStyle: 'automatic',
    newArchEnabled: true,

    ios: {
      supportsTablet: true,
      bundleIdentifier: 'com.example.yotiExpoSample',
      infoPlist: {
        NSCameraUsageDescription:
          'This app needs access to the camera to take photos.',
        NSPhotoLibraryUsageDescription: 'This app needs access to photos.',
        NSFaceIDUsageDescription: 'This app needs access to Face ID.',
        NFCReaderUsageDescription:
          'This app needs access to NFC to read ID documents.',
        'com.apple.developer.nfc.readersession.iso7816.select-identifiers': [
          'A0000002471001',
          'A0000002471001',
        ],
        ITSAppUsesNonExemptEncryption: false,
      },
    },
    android: {
      adaptiveIcon: {
        foregroundImage: './assets/images/adaptive-icon.png',
        backgroundColor: '#ffffff',
      },
      package: 'com.example.yotiExpoSample',
    },

    web: {
      bundler: 'metro',
      output: 'static',
      favicon: './assets/images/favicon.png',
    },
    plugins: [
      'expo-router',
      [
        'expo-splash-screen',
        {
          image: './assets/images/splash-icon.png',
          imageWidth: 200,
          resizeMode: 'contain',
          backgroundColor: '#ffffff',
        },
      ],

      [
        'expo-build-properties',
        {
          android: {
            extraMavenRepos: [
              {
                url: 'https://maven.regulaforensics.com/RegulaDocumentReader',
              },
              {
                url: 'https://maven.microblink.com',
              },
            ],
            compileSdkVersion: 35,
            targetSdkVersion: 35,
            minSdkVersion: 24,
            buildToolsVersion: '35.0.0',
            kotlinVersion: '1.9.24',
          },
          ios: {
            useFrameworks: 'static',
            deploymentTarget: '16.0',
            extraBuildProperties: {
              CLANG_CXX_LANGUAGE_STANDARD: 'gnu++20',
              CLANG_CXX_LIBRARY: 'libc++',
              OTHER_CPLUSPLUSFLAGS:
                '$(OTHER_CFLAGS) -DFOLLY_NO_CONFIG -DFOLLY_HAVE_LIBGFLAGS=0 -DFOLLY_HAVE_LIBJEMALLOC=0 -DFOLLY_HAVE_PREADV=0 -DFOLLY_MOBILE=1 -DFOLLY_USE_LIBCPP=1 -DFOLLY_CFG_NO_COROUTINES=1 -DFOLLY_HAVE_CLOCK_GETTIME=1',
              VALIDATE_WORKSPACE_SKIPS_LIBRARY_VALIDATION: 'YES',
            },
          },
        },
      ],

      './config-plugins/withBitcodeStripping',
      './config-plugins/withKotlinVersion',
    ],
    experiments: {
      typedRoutes: true,
    },

    extra: {
      router: {
        origin: false,
      },
    },
  };
};
