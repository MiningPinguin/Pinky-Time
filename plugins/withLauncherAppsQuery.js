const { withAndroidManifest } = require('@expo/config-plugins');

function withLauncherAppsQuery(config) {
  return withAndroidManifest(config, (config) => {
    const manifest = config.modResults;
    const queries = (manifest.manifest.queries = manifest.manifest.queries || []);
    if (queries.length === 0) {
      queries.push({ intent: [] });
    }
    const target = queries[0];
    target.intent = target.intent || [];
    const hasLauncherQuery = target.intent.some(
      (intent) =>
        Array.isArray(intent.action) &&
        intent.action.some(
          (action) => action?.$?.['android:name'] === 'android.intent.action.MAIN',
        ) &&
        Array.isArray(intent.category) &&
        intent.category.some(
          (category) =>
            category?.$?.['android:name'] === 'android.intent.category.LAUNCHER',
        ),
    );
    if (!hasLauncherQuery) {
      target.intent.push({
        action: [{ $: { 'android:name': 'android.intent.action.MAIN' } }],
        category: [{ $: { 'android:name': 'android.intent.category.LAUNCHER' } }],
      });
    }
    return config;
  });
}

module.exports = withLauncherAppsQuery;