import { useEffect, useState } from 'react';
import { View } from 'react-native';

import { Text } from '@/components/primitives';
import { StyledButton } from '@/components/StyledButton';
import {
  hasOverlayPermission,
  hideOverlay,
  isAccessibilityEnabled,
  openAccessibilitySettings,
  requestOverlayPermission,
  showOverlay,
  syncTrackedApps,
} from '@/services';

export function OverlayDebugPanel() {
  const [permission, setPermission] = useState(hasOverlayPermission());
  const [accessibility, setAccessibility] = useState(isAccessibilityEnabled());

  useEffect(() => {
    void syncTrackedApps();
    const interval = setInterval(() => {
      setPermission(hasOverlayPermission());
      setAccessibility(isAccessibilityEnabled());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <View className="p-4 gap-3">
      <Text weight="medium">Overlay permission: {permission ? 'granted' : 'not granted'}</Text>
      <Text weight="medium">Accessibility: {accessibility ? 'enabled' : 'disabled'}</Text>
      <StyledButton
        label="Request overlay permission"
        onPress={() => {
          requestOverlayPermission();
          setPermission(hasOverlayPermission());
        }}
      />
      <StyledButton
        label="Open accessibility settings"
        onPress={() => {
          openAccessibilitySettings();
        }}
      />
      <StyledButton
        label="Show overlay"
        onPress={() => void showOverlay('Test App', 'com.pinkytime.testapp')}
      />
      <StyledButton label="Hide overlay" onPress={() => void hideOverlay()} />
      <StyledButton label="Sync tracked apps" onPress={() => void syncTrackedApps()} />
    </View>
  );
}