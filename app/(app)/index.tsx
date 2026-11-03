import {Screen} from "@/components/primitives";
import {InstalledAppsList} from "@/components/appList/InstalledAppsList";
import {OverlayDebugPanel} from "@/components/debug/OverlayDebugPanel";

export default function HomeScreen() {
  return (
    <Screen padding="none" scrollable={false}>
      <OverlayDebugPanel />
      <InstalledAppsList />
    </Screen>
  );
}