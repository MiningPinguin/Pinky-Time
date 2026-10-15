import type { StorybookConfig } from '@storybook/react-vite';
import { mergeConfig } from 'vite';
import { transformAsync } from '@babel/core';
import { readFileSync } from 'fs';

const REACT_NATIVE_PACKAGE_REGEX = /node_modules\/(react-native|@react-native|@expo|expo(-[a-z-]+)?)\/.*\.js$/;

const babelTransformReactNative = async (code: string, filename: string): Promise<string> => {
  const result = await transformAsync(code, {
    filename,
    babelrc: false,
    configFile: false,
    sourceType: 'unambiguous',
    presets: [
      '@babel/preset-flow',
      ['@babel/preset-react', { runtime: 'automatic' }],
    ],
  });
  return result?.code ?? code;
};

const reactNativeVitePlugin = {
  name: 'react-native-node-modules',
  enforce: 'pre' as const,
  async transform(code: string, id: string) {
    if (!REACT_NATIVE_PACKAGE_REGEX.test(id)) return null;
    const transformed = await babelTransformReactNative(code, id);
    return { code: transformed };
  },
};

const reactNativeEsbuildPlugin = {
  name: 'react-native-flow-strip',
  setup(build: any) {
    build.onLoad({ filter: REACT_NATIVE_PACKAGE_REGEX }, async (args: any) => {
      const code = readFileSync(args.path, 'utf8');
      const transformed = await babelTransformReactNative(code, args.path);
      return { contents: transformed, loader: 'js' };
    });
  },
};

const expoNativeOnlyCompatPlugin = {
  name: 'expo-native-only-compat',
  enforce: 'pre' as const,
  resolveId(source: string, importer: string | undefined) {
    // react-native-web exposes no TurboModuleRegistry; the native module lookup
    // it feeds is unreachable in a browser, so point it at an inert stub. The
    // specifier has already been rewritten to `react-native-web` by the alias above.
    if (
      (source === 'react-native' || source === 'react-native-web') &&
      importer?.endsWith('requireNativeModule.ts')
    ) {
      return '\0turbo-module-registry-stub';
    }
    return null;
  },
  load(id: string) {
    if (id === '\0turbo-module-registry-stub') {
      return [
        'const unavailable = () => { throw new Error("TurboModuleRegistry is unavailable on web"); };',
        'export const TurboModuleRegistry = { get: () => null, getEnforcing: unavailable };',
      ].join('\n');
    }
    // `src/ts-declarations/*` are pure `declare` files with no runtime code, but
    // they import their siblings in value position, which Rolldown cannot resolve.
    if (/expo-modules-core[\\/]src[\\/]ts-declarations[\\/]/.test(id)) {
      return 'export default {};';
    }
    return null;
  },
};

const config: StorybookConfig = {
  stories: ['../src/components/primitives/**/*.stories.tsx'],
  addons: [],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  viteFinal: async (baseConfig) => {
    return mergeConfig(baseConfig, {
      resolve: {
        alias: {
          'react-native': 'react-native-web',
        },
      },
      plugins: [expoNativeOnlyCompatPlugin, reactNativeVitePlugin],
      esbuild: {
        jsx: 'automatic',
        jsxImportSource: 'react',
      },
      optimizeDeps: {
        esbuildOptions: {
          plugins: [reactNativeEsbuildPlugin],
          jsx: 'automatic',
          jsxImportSource: 'react',
        },
      },
    });
  },
};

export default config;
