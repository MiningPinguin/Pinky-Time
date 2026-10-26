import type { StorybookConfig } from '@storybook/react-vite';
import { mergeConfig } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';
import { expoNativeOnlyCompatPlugin } from './vite/expoCompatPlugin.ts';
import { reactNativeVitePlugin, reactNativeRolldownPlugin } from './vite/reactNativeTransform.ts';
import { silenceExpoSourcemaps } from './vite/silenceSourcemaps.ts';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const jsx = { jsx: 'automatic', jsxImportSource: 'nativewind' } as const;

const config: StorybookConfig = {
  stories: ['../src/components/primitives/**/*.stories.tsx'],
  addons: [],
  framework: { name: '@storybook/react-vite', options: {} },
  viteFinal: (baseConfig) =>
    mergeConfig(baseConfig, {
      resolve: {
        alias: [
          // Native-only; must come before the bare react-native alias.
          {
            find: /^react-native\/Libraries\/Utilities\/codegenNativeComponent$/,
            replacement: path.resolve(__dirname, 'stubs/codegenNativeComponent.js'),
          },
          { find: /^react-native$/, replacement: 'react-native-web' },
        ],
      },
      plugins: [expoNativeOnlyCompatPlugin, reactNativeVitePlugin, silenceExpoSourcemaps],
      esbuild: jsx,
      optimizeDeps: {
        rolldownOptions: {
          plugins: [reactNativeRolldownPlugin],
          transform: { jsx: { runtime: 'automatic', importSource: 'nativewind' } },
        },
        exclude: ['expo-modules-core'],
      },
    }),
};

export default config;