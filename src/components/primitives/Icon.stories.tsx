import type { Meta, StoryObj } from '@storybook/react';
import { Row } from './Row';
import { Stack } from './Stack';
import { Icon } from './Icon';
import { Text } from './Text';

const meta: Meta<typeof Icon> = { title: 'Primitives/Icon', component: Icon };
export default meta;
type Story = StoryObj<typeof Icon>;

export const Default: Story = { args: { name: 'home' } };
export const Small: Story = { args: { name: 'settings', size: 16 } };
export const Large: Story = { args: { name: 'settings', size: 32 } };
export const ExtraLarge: Story = { args: { name: 'trophy-outline', size: 48 } };
export const Colored: Story = { args: { name: 'heart', color: 'red', size: 28 } };
export const AllColors: Story = {
  render: () => (
    <Stack gap="sm">
      <Row gap="md">
        <Icon name="heart" color="red" />
        <Icon name="heart" color="green" />
        <Icon name="heart" color="blue" />
        <Icon name="heart" color="purple" />
      </Row>
      <Row gap="md">
        <Icon name="star" color="amber" />
        <Icon name="star" color="teal" />
        <Icon name="star" color="gray" />
        <Icon name="star" color="black" />
      </Row>
      <Text size="sm" color="text-gray-400">Example color strings passed to the icon</Text>
    </Stack>
  ),
};
