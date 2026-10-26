import { readFileSync } from 'fs';

export const silenceExpoSourcemaps = {
  name: 'silence-expo-modules-core-sourcemaps',
  enforce: 'pre' as const,
  load(id: string) {
    const file = id.split('?')[0];
    if (!/node_modules[\\/]expo-modules-core[\\/]build[\\/].*\.js$/.test(file)) return null;
    const code = readFileSync(file, 'utf8').replace(/^\/\/# sourceMappingURL=.*$/m, '');
    return { code, map: null };
  },
};