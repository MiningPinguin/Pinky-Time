import { useState } from 'react';

import { Stack, Text } from '@/components/primitives';
import { DurationPicker } from '@/components/durationPicker';
import { StyledButton } from '@/components/StyledButton';
import { hideOverlay, savePinkyPromise } from '@/services';

interface OverlayPromptProps {
  appName?: string;
  packageName?: string;
}

export function OverlayPrompt({ appName, packageName }: OverlayPromptProps) {
  const [duration, setDuration] = useState(5 * 60);
  const [saving, setSaving] = useState(false);
  const label = appName ?? 'this app';

  const handleConfirm = () => {
    if (!packageName || saving) return;
    void (async () => {
      setSaving(true);
      try {
        await savePinkyPromise(packageName, duration);
        await hideOverlay();
      } catch {
        // Keep the overlay visible so the user can retry.
        setSaving(false);
      }
    })();
  };

  return (
    <Stack gap="lg" padding="lg" align="center" className="bg-[#2A1B3D]">
      <Text size="xl" weight="bold" align="center" color="text-white">
        How long do you Pinky Promise to spend on {label}?
      </Text>
      <DurationPicker value={duration} onChange={setDuration} />
      {packageName ? (
        <StyledButton
          label="Pinky Promise"
          onPress={handleConfirm}
          isLoading={saving}
        />
      ) : null}
      <StyledButton
        label="Hide"
        variant="secondary"
        onPress={() => void hideOverlay()}
      />
    </Stack>
  );
}

// Register so the native overlay window can render this component.
import { AppRegistry } from 'react-native';
AppRegistry.registerComponent('OverlayPrompt', () => OverlayPrompt);

// RN's AppContainer wraps every registered component in a root <View
// style={{flex: 1}}>, which means "grow into whatever space the window
// provides". That is what a full-screen app wants, but this overlay should
// hug its content instead. There is no per-surface override in the API
// (setRootViewStyleProvider is global and missing from the TS typings), so
// use a no-flex root style globally and restore full-screen behaviour for
// the main app by adding an explicit flex-1 wrapper in app/_layout.tsx.
(AppRegistry as unknown as { setRootViewStyleProvider?: (provider: unknown) => void })
  .setRootViewStyleProvider?.(() => ({}));
