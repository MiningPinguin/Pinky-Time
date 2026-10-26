import type { Meta, StoryObj } from '@storybook/react';
import { Avatar } from './Avatar';

const meta: Meta<typeof Avatar> = { title: 'Primitives/Avatar', component: Avatar };
export default meta;
type Story = StoryObj<typeof Avatar>;

const uri = 'https://picsum.photos/seed/pinkytime/96';

export const WithInitials: Story = { args: { name: 'Niels Jacobs' } };
export const Small: Story = { args: { name: 'NJ', size: 'sm' } };
export const Medium: Story = { args: { name: 'NJ', size: 'md' } };
export const Large: Story = { args: { name: 'NJ', size: 'lg' } };
export const WithUri: Story = { args: { uri } };
export const WithUriSmall: Story = { args: { uri, size: 'sm' } };
export const WithUriLarge: Story = { args: { uri, size: 'lg' } };
