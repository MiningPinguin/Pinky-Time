import { Slot } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import '../global.css';
import '@/components/overlay/OverlayPrompt';

export default function RootLayout() {
  return (
    // flex-1 here keeps the main app painting the full screen. The React root
    // view style is globally set to a no-flex, content-hugging style (see
    // src/components/overlay/OverlayPrompt.tsx) so the overlay popup can wrap
    // its content; without this wrapper the app would shrink to its content.
    <View style={{ flex: 1 }}>
      <SafeAreaProvider>
        <StatusBar style="auto" />
        <Slot />
      </SafeAreaProvider>
    </View>
  );
}
