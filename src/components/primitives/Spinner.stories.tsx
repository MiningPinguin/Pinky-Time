import type { Meta, StoryObj } from '@storybook/react';
import { Row } from './Row';
import { Stack } from './Stack';
import { Spinner } from './Spinner';
import { Text } from './Text';

const meta: Meta<typeof Spinner> = { title: 'Primitives/Spinner', component: Spinner };
export default meta;
type Story = StoryObj<typeof Spinner>;

export const Small: Story = { args: { size: 'small' } };
export const Large: Story = { args: { size: 'large' } };
export const SmallColored: Story = { args: { size: 'small', color: 'red' } };
export const LargeColored: Story = { args: { size: 'large', color: 'blue' } };
export const AllColors: Story = {
  render: () => (
    <Stack gap="sm">
      <Row gap="md">
        <Spinner size="small" color="red" />
        <Spinner size="small" color="green" />
        <Spinner size="small" color="blue" />
        <Spinner size="small" color="purple" />
      </Row>
      <Text size="sm" color="text-gray-400">Example color strings passed to the spinner</Text>
    </Stack>
  ),
};
