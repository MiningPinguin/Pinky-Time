import { useAuthStore } from '../../src/state/useAuthStore';
import { Screen } from '../../src/components/primitives/Screen';
import { Stack } from '../../src/components/primitives/Stack';
import { Text } from '../../src/components/primitives/Text';
import { EmptyState } from '../../src/components/primitives/EmptyState';
import { StyledButton } from '../../src/components/StyledButton';
import { Badge } from '@/components/primitives';
import { InstalledAppsList } from '../../src/components/InstalledAppsList';

export default function HomeScreen() {
  const { user, logout } = useAuthStore();

  return (
    <Screen padding="lg" scrollable={false}>
      <Stack gap="lg" flex={1}>
        <InstalledAppsList />
      </Stack>
    </Screen>
  );
}

