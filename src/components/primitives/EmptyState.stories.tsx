import type { Meta, StoryObj } from '@storybook/react';
import { EmptyState } from './EmptyState';
import { Text } from './Text';

const meta: Meta<typeof EmptyState> = { title: 'Primitives/EmptyState', component: EmptyState };
export default meta;
type Story = StoryObj<typeof EmptyState>;

export const Default: Story = { args: { title: 'Nothing here yet' } };
export const WithDescription: Story = {
  args: { title: 'No items found', description: 'Add your first item to get started.' },
};
export const WithAction: Story = {
  args: {
    title: 'Nothing here yet',
    description: 'Create your first entry to fill this space.',
    action: <Text color="text-blue-600">+ Add item</Text>,
  },
};
export const WithTitlesSettings: Story = {
  args: {
    title: 'Nothing here yet',
    description: 'Title and description size can be tuned.',
    titleTextProps: { size: 'xl' },
    descriptionTextProps: { size: 'lg', color: 'text-gray-500' },
  },
};
