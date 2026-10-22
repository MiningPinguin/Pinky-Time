import { Screen } from '../../src/components/primitives/Screen';
import { Stack } from '../../src/components/primitives/Stack';
import { InstalledAppsList } from '../../src/components/InstalledAppsList';

export default function HomeScreen() {
  return (
    <Screen padding="lg" scrollable={false}>
      <Stack gap="lg" flex={1}>
        <InstalledAppsList />
      </Stack>
    </Screen>
  );
}
