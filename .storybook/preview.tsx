import React from 'react';
import type { Preview } from '@storybook/react';
import { View } from 'react-native';

const preview: Preview = {
  decorators: [
    (Story) => (
      <View className="p-4">
        <Story />
      </View>
    ),
  ],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
