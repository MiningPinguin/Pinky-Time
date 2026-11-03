import {Screen} from "@/components/primitives";
import {Stack} from "@/components/primitives";
import {InstalledAppsList} from "@/components/appList/InstalledAppsList";

export default function HomeScreen() {
  return (
    <Screen padding="lg" scrollable={false}>
      <Stack gap="lg" flex={1}>
        <InstalledAppsList />
      </Stack>
    </Screen>
  );
}