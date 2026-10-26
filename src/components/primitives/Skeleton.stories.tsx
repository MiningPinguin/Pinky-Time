import type { Meta, StoryObj } from '@storybook/react';
import { Stack } from './Stack';
import { Skeleton } from './Skeleton';

const meta: Meta<typeof Skeleton> = { title: 'Primitives/Skeleton', component: Skeleton };
export default meta;
type Story = StoryObj<typeof Skeleton>;

export const Default: Story = { args: { width: 200, height: 20 } };
export const Small: Story = { args: { width: 120, height: 12, borderRadius: 6 } };
export const Circle: Story = { args: { width: 48, height: 48, borderRadius: 24 } };
export const Rounded: Story = { args: { width: 200, height: 48, borderRadius: 12 } };
export const FullWidth: Story = { args: {} };
export const TextLines: Story = {
  render: () => (
    <Stack className="w-64" gap="sm">
      <Skeleton height={18} />
      <Skeleton height={18} />
      <Skeleton width="60%" height={18} />
    </Stack>
  ),
};
