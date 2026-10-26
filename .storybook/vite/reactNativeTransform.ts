import { transformAsync } from '@babel/core';
import { readFileSync } from 'fs';

// [\\/] so it also matches on Windows paths
export const RN_PACKAGE_REGEX =
  /node_modules[\\/](react-native|@react-native|@expo|expo(-[a-z-]+)?)[\\/].*\.js$/;

async function stripFlow(code: string, filename: string): Promise<string> {
  const result = await transformAsync(code, {
    filename,
    babelrc: false,
    configFile: false,
    sourceType: 'unambiguous',
    presets: ['@babel/preset-flow', ['@babel/preset-react', { runtime: 'automatic' }]],
  });
  return result?.code ?? code;
}

/** Vite dev-server transform. */
export const reactNativeVitePlugin = {
  name: 'react-native-node-modules',
  enforce: 'pre' as const,
  async transform(code: string, id: string) {
    if (!RN_PACKAGE_REGEX.test(id)) return null;
    return { code: await stripFlow(code, id) };
  },
};

/** Same transform, for the dependency optimizer (Rolldown). */
export const reactNativeRolldownPlugin = {
  name: 'react-native-flow-strip',
  async transform(code: string, id: string) {
    if (!RN_PACKAGE_REGEX.test(id)) return null;
    return { code: await stripFlow(code, id) };
  },
};