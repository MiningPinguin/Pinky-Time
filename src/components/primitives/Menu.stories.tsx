import type { Meta, StoryObj } from '@storybook/react';
import { Menu } from './Menu';

const meta: Meta<typeof Menu> = { title: 'Primitives/Menu', component: Menu };
export default meta;
type Story = StoryObj<typeof Menu>;

const items = [
  { label: 'Edit', onPress: () => {} },
  { label: 'Move', onPress: () => {} },
  { label: 'Share', onPress: () => {} },
  { label: 'Delete', onPress: () => {} },
];

export const Visible: Story = {
  args: {
    visible: true,
    onClose: () => {},
    items: [
      { label: 'Edit', onPress: () => {} },
      { label: 'Delete', onPress: () => {} },
    ],
  },
};
export const Hidden: Story = {
  args: {
    visible: false,
    onClose: () => {},
    items: [{ label: 'Edit', onPress: () => {} }],
  },
};
export const MoreItems: Story = {
  args: {
    visible: true,
    onClose: () => {},
    items,
  },
};
export const WithItemSettings: Story = {
  args: {
    visible: true,
    onClose: () => {},
    items: [
      { label: 'Edit', onPress: () => {} },
      { label: 'Share', onPress: () => {} },
    ],
    itemTextProps: { weight: 'medium', color: 'text-blue-600' },
  },
};
