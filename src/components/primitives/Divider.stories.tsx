import type { Meta, StoryObj } from '@storybook/react';
import { View } from 'react-native';
import { Divider } from './Divider';
import { Text } from './Text';

const meta: Meta<typeof Divider> = { title: 'Primitives/Divider', component: Divider };
export default meta;
type Story = StoryObj<typeof Divider>;

export const Horizontal: Story = { args: { orientation: 'horizontal' } };
export const HorizontalSpaced: Story = { args: { orientation: 'horizontal', spacing: 'md' } };
export const HorizontalSpacedSM: Story = { args: { orientation: 'horizontal', spacing: 'sm' } };
export const HorizontalSpacedLG: Story = { args: { orientation: 'horizontal', spacing: 'lg' } };
export const Vertical: Story = {
  // Wrapped in a fixed-height view so h-full is visible on the canvas
  render: () => (
    <View className="h-24 flex-1 flex-row items-center">
      <Text>Left</Text>
      <Divider orientation="vertical" className="mx-3" />
      <Text>Right</Text>
    </View>
  ),
};
export const VerticalSpaced: Story = {
  render: () => (
    <View className="h-24 flex-1 flex-row items-center">
      <Text>Left</Text>
      <Divider orientation="vertical" spacing="md" />
      <Text>Right</Text>
    </View>
  ),
};
