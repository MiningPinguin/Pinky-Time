import type { Meta, StoryObj } from '@storybook/react';
import { NavItem } from './NavItem';

const meta: Meta<typeof NavItem> = { title: 'Primitives/NavItem', component: NavItem };
export default meta;
type Story = StoryObj<typeof NavItem>;

export const Default: Story = { args: { label: 'Home', onPress: () => {} } };
export const Active: Story = { args: { label: 'Profile', onPress: () => {}, active: true } };
export const InactiveCustomLabel: Story = {
  args: { label: 'Explore', onPress: () => {}, labelTextProps: { weight: 'bold', color: 'text-blue-600' } },
};
export const ActiveCustomLabel: Story = {
  args: { label: 'Profile', onPress: () => {}, active: true, labelTextProps: { weight: 'normal' } },
};
