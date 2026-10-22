import { useEffect, useState } from 'react';
import { Image, View } from 'react-native';

import { getAppIcon } from '../services/installedAppsService';

const iconCache = new Map<string, string>();

interface AppIconProps {
  packageName: string;
  size?: number;
}

export function AppIcon({ packageName, size = 40 }: AppIconProps) {
  const [icon, setIcon] = useState<string>(iconCache.get(packageName) ?? '');

  useEffect(() => {
    let isMounted = true;
    const cached = iconCache.get(packageName);
    if (cached !== undefined) {
      setIcon(cached);
      return;
    }

    getAppIcon(packageName).then((result) => {
      iconCache.set(packageName, result);
      if (isMounted) {
        setIcon(result);
      }
    });

    return () => {
      isMounted = false;
    };
  }, [packageName]);

  if (icon === '') {
    return <View className="w-10 h-10 rounded-lg bg-gray-200 mr-3" />;
  }

  return (
    <Image
      source={{ uri: icon }}
      className="w-10 h-10 rounded-lg mr-3"
      style={{ width: size, height: size }}
    />
  );
}