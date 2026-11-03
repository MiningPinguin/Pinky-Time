import {Screen} from "@/components/primitives";
import {InstalledAppsList} from "@/components/appList/InstalledAppsList";

export default function HomeScreen() {
  return (
    <Screen padding="none" scrollable={false}>
        <InstalledAppsList />
    </Screen>
  );
}