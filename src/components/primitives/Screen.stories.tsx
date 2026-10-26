import type { Meta, StoryObj } from '@storybook/react';
import { Screen } from './Screen';
import { Text } from './Text';

const meta: Meta<typeof Screen> = { title: 'Primitives/Screen', component: Screen };
export default meta;
type Story = StoryObj<typeof Screen>;

export const Default: Story = { args: { children: <Text>Screen content</Text>, padding: 'md' } };
export const None: Story = {
  args: { children: <Text>No padding</Text>, padding: 'none' },
};
export const Small: Story = {
  args: { children: <Text>Small padding</Text>, padding: 'sm' },
};
export const Large: Story = {
  args: { children: <Text>Large padding</Text>, padding: 'lg' },
};
export const NonScrollable: Story = {
  args: { children: <Text>Fixed screen</Text>, padding: 'lg', scrollable: false },
};
export const NonScrollableMd: Story = {
  args: { children: <Text>Fixed screen, medium padding</Text>, padding: 'md', scrollable: false },
};
