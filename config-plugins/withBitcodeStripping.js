// YOTI Module has bit code which needs to be stripped from the build as its not supported
// this plugin is used to strip the bitcode from the build

const { withDangerousMod } = require('@expo/config-plugins');
const fs = require('fs');
const path = require('path');

const bitcodeStrippingCode = `
    bitcode_strip_path = \`xcrun --find bitcode_strip\`.chop!
      def strip_bitcode_from_framework(bitcode_strip_path, framework_relative_path)
        framework_path = File.join(Dir.pwd, framework_relative_path)
        if File.exist?(framework_path)
          command = "\#{bitcode_strip_path} \#{framework_path} -r -o \#{framework_path}"
          puts "Stripping bitcode: \#{command}"
          system(command)
        else
          puts "Framework not found: \#{framework_path}"
        end
      end
      
      framework_paths = [
        # Pods directory frameworks
        "Pods/YotiNFC/YotiNFC/YotiNFC.xcframework/ios-arm64/YotiNFC.framework/YotiNFC",
        "Pods/YotiNFC/YotiNFC/YotiNFC.xcframework/ios-arm64_x86_64-simulator/YotiNFC.framework/YotiNFC",
        "Pods/PPBlinkID/Microblink.xcframework/ios-arm64/Microblink.framework/Microblink",
        "Pods/PPBlinkID/Microblink.xcframework/ios-arm64_x86_64-maccatalyst/Microblink.framework/Microblink",
        "Pods/PPBlinkID/Microblink.xcframework/ios-arm64_x86_64-simulator/Microblink.framework/Microblink"
      ]

      # First pass: Strip bitcode from frameworks in Pods directory
      framework_paths.each do |framework_relative_path|
        strip_bitcode_from_framework(bitcode_strip_path, framework_relative_path)
      end
`;

const withBitcodeStripping = (config) => {
  return withDangerousMod(config, [
    'ios',
    async (config) => {
      const podfilePath = path.join(
        config.modRequest.platformProjectRoot,
        'Podfile'
      );
      let podfileContent = fs.readFileSync(podfilePath, 'utf-8');

      // Find the post_install block
      const postInstallMatch = podfileContent.match(
        /post_install\s+do\s+\|installer\|([\s\S]*?)end/
      );

      if (postInstallMatch) {
        // Insert our bitcode stripping code just after the react_native_post_install call
        const updatedPostInstall = postInstallMatch[0].replace(
          /react_native_post_install\([^)]+\)/,
          `$&\n${bitcodeStrippingCode}`
        );

        podfileContent = podfileContent.replace(
          /post_install\s+do\s+\|installer\|([\s\S]*?)end/,
          updatedPostInstall
        );

        fs.writeFileSync(podfilePath, podfileContent);
      }

      return config;
    },
  ]);
};

module.exports = withBitcodeStripping;
