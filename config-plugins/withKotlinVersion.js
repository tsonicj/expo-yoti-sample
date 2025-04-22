const { withGradleProperties } = require('@expo/config-plugins');

const KOTLIN_VERSION = '1.9.24';

/**
 * Config plugin to force a specific Kotlin version across all modules in an Expo project
 */
const withKotlinVersion = (config) => {
  // Modify android gradle.properties to set kotlin version
  config = withGradleProperties(config, (config) => {
    config.modResults = config.modResults.filter(
      (item) => item.type !== 'property' || item.key !== 'kotlin.version'
    );

    config.modResults.push({
      type: 'property',
      key: 'kotlin.version',
      value: KOTLIN_VERSION,
    });

    // Update android.kotlinVersion as well (used by Expo)
    config.modResults = config.modResults.filter(
      (item) => item.type !== 'property' || item.key !== 'android.kotlinVersion'
    );

    config.modResults.push({
      type: 'property',
      key: 'android.kotlinVersion',
      value: KOTLIN_VERSION,
    });

    return config;
  });

  return config;
};

module.exports = withKotlinVersion;
