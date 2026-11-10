import { useState } from 'react';

import { Stack, Text } from '@/components/primitives';
import { DurationPicker } from '@/components/durationPicker';

export default function PromptScreen() {
  const [duration, setDuration] = useState(5 * 60);

  return (
    <Stack gap="lg" padding="lg" align="center">
      <Text size="xl" weight="bold" align="center">
        How long do you want to spend here?
      </Text>
      <DurationPicker value={duration} onChange={setDuration} />
    </Stack>
  );
}