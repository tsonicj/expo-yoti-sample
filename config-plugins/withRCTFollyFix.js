// const { withDangerousMod } = require('@expo/config-plugins');
// const fs = require('fs');
// const path = require('path');

// const follyFixCode = `
// # Fix for RCT-Folly C++ template errors
// post_integrate do |installer|
//   puts "Applying RCT-Folly fix for C++ template errors..."

//   # Find the RCT-Folly target
//   installer.pods_project.targets.each do |target|
//     if target.name == 'RCT-Folly'
//       target.build_configurations.each do |config|
//         # Add preprocessor macros to fix template instantiation errors
//         config.build_settings['GCC_PREPROCESSOR_DEFINITIONS'] ||= ['$(inherited)']
//         config.build_settings['GCC_PREPROCESSOR_DEFINITIONS'] << 'FOLLY_HAVE_CLOCK_GETTIME=1'
//         config.build_settings['GCC_PREPROCESSOR_DEFINITIONS'] << 'FOLLY_MOBILE=1'
//         config.build_settings['GCC_PREPROCESSOR_DEFINITIONS'] << 'FOLLY_USE_LIBCPP=1'
//         config.build_settings['GCC_PREPROCESSOR_DEFINITIONS'] << 'FOLLY_CFG_NO_COROUTINES=1'

//         # Ensure C++17 standard is used
//         config.build_settings['CLANG_CXX_LANGUAGE_STANDARD'] = 'gnu++17'
//         config.build_settings['CLANG_CXX_LIBRARY'] = 'libc++'

//         # Add additional compiler flags specific to RCT-Folly
//         # Handle both array and string types for OTHER_CPLUSPLUSFLAGS
//         folly_flags = '-DFOLLY_NO_CONFIG -DFOLLY_HAVE_LIBGFLAGS=0 -DFOLLY_HAVE_LIBJEMALLOC=0 -DFOLLY_HAVE_PREADV=0'

//         if config.build_settings['OTHER_CPLUSPLUSFLAGS'].nil?
//           # Initialize if it doesn't exist
//           config.build_settings['OTHER_CPLUSPLUSFLAGS'] = ['$(inherited)', folly_flags]
//         elsif config.build_settings['OTHER_CPLUSPLUSFLAGS'].is_a?(Array)
//           # If it's an array, add a new element
//           config.build_settings['OTHER_CPLUSPLUSFLAGS'] << folly_flags
//         else
//           # If it's a string, convert to array with both values
//           current_value = config.build_settings['OTHER_CPLUSPLUSFLAGS']
//           config.build_settings['OTHER_CPLUSPLUSFLAGS'] = [current_value, folly_flags]
//         end
//       end
//     end
//   end
// end
// `;

// /**
//  * Config plugin to fix RCT-Folly C++ template errors on iOS builds
//  */
// const withRCTFollyFix = (config) => {
//   return withDangerousMod(config, [
//     'ios',
//     async (config) => {
//       const podfilePath = path.join(
//         config.modRequest.platformProjectRoot,
//         'Podfile'
//       );
//       let podfileContent = fs.readFileSync(podfilePath, 'utf-8');

//       if (!podfileContent.includes('# Fix for RCT-Folly C++ template errors')) {
//         // Append the fix to the end of the Podfile
//         podfileContent += '\n' + follyFixCode;
//         fs.writeFileSync(podfilePath, podfileContent);
//       }

//       return config;
//     },
//   ]);
// };

// module.exports = withRCTFollyFix;
