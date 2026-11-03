const { withAppBuildGradle } = require("expo/config-plugins");

module.exports = (config) =>
  withAppBuildGradle(config, (c) => {
    if (!c.modResults.contents.includes('version "3.31.6"')) {
      c.modResults.contents = c.modResults.contents.replace(
        /android\s*\{/,
        `android {\n    externalNativeBuild { cmake { version "3.31.6" } }`
      );
    }
    return c;
  });