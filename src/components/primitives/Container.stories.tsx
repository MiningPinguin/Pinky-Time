import type { Meta, StoryObj } from '@storybook/react';
import { Container } from './Container';
import { Text } from './Text';

const meta: Meta<typeof Container> = { title: 'Primitives/Container', component: Container };
export default meta;
type Story = StoryObj<typeof Container>;

export const Default: Story = { args: { children: <Text>Inside a container</Text> } };
export const WithPadding: Story = { args: { children: <Text>Padded content</Text>, padding: 'md' } };
export const PaddingSM: Story = { args: { children: <Text>Small padding</Text>, padding: 'sm' } };
export const PaddingLG: Story = { args: { children: <Text>Large padding</Text>, padding: 'lg' } };
export const WithFlex: Story = { args: { children: <Text>Flex 1 container</Text>, flex: 1 } };
