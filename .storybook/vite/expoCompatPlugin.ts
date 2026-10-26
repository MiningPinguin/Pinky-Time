const TURBO_STUB = '\0turbo-module-registry-stub';
const DECLARATIONS_STUB = '\0expo-modules-core-declarations-stub';

const STUB_SOURCES: Record<string, string> = {
  [TURBO_STUB]: `
    const unavailable = () => { throw new Error('TurboModuleRegistry is unavailable on web'); };
    export const TurboModuleRegistry = { get: () => null, getEnforcing: unavailable };
  `,
  [DECLARATIONS_STUB]: 'export default {};',
};

export const expoNativeOnlyCompatPlugin = {
  name: 'expo-native-only-compat',
  enforce: 'pre' as const,
  resolveId(source: string, importer?: string) {
    // react-native-web has no TurboModuleRegistry; the lookup is unreachable in a browser.
    if (
      (source === 'react-native' || source === 'react-native-web') &&
      importer?.endsWith('requireNativeModule.ts')
    ) {
      return TURBO_STUB;
    }
    // These files only contain `export {};` but importers import named exports from them.
    if (/expo-modules-core[\\/](?:src|build)[\\/]ts-declarations[\\/]/.test(source)) {
      return DECLARATIONS_STUB;
    }
    return null;
  },
  load(id: string) {
    return STUB_SOURCES[id] ?? null;
  },
};