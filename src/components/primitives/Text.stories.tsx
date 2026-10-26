import type { Meta, StoryObj } from '@storybook/react';
import { Text } from './Text';
import { Row } from './Row';
import { Stack } from './Stack';

const meta: Meta<typeof Text> = { title: 'Primitives/Text', component: Text };
export default meta;
type Story = StoryObj<typeof Text>;

const sizes = ['sm', 'md', 'lg', 'xl'] as const;
const weights = ['normal', 'medium', 'bold'] as const;

export const Default: Story = { args: { children: 'The quick brown fox' } };
export const Small: Story = { args: { children: 'Small text', size: 'sm' } };
export const Large: Story = { args: { children: 'Large text', size: 'lg' } };
export const ExtraLarge: Story = { args: { children: 'XL heading', size: 'xl' } };
export const MediumWeight: Story = { args: { children: 'Medium weight text', weight: 'medium' } };
export const Bold: Story = { args: { children: 'Bold text', weight: 'bold' } };
export const Centered: Story = { args: { children: 'Centered text', align: 'center' } };
export const RightAligned: Story = { args: { children: 'Right-aligned text', align: 'right' } };
export const ExtraLargeBold: Story = { args: { children: 'XL bold heading', size: 'xl', weight: 'bold' } };
export const SingleLine: Story = {
  args: { children: 'A very long line of text that gets clipped to a single line when numberOfLines is set', numberOfLines: 1 },
};
export const Colors: Story = {
  render: () => (
    <Stack gap="sm">
      <Text color="text-gray-500">Gray 500</Text>
      <Text color="text-red-500">Red 500</Text>
      <Text color="text-amber-500">Amber 500</Text>
      <Text color="text-emerald-500">Emerald 500</Text>
      <Text color="text-blue-500">Blue 500</Text>
      <Text color="text-pink-500">Pink 500</Text>
    </Stack>
  ),
};
export const SizeWeightCombine: Story = {
  render: () => (
    <Stack gap="sm">
      {sizes.map((size) => (
        <Row key={size} gap="md">
          <Text size="sm" color="text-gray-400">{size}</Text>
          {weights.map((weight) => (
            <Text key={weight} size={size} weight={weight}>{weight}</Text>
          ))}
        </Row>
      ))}
    </Stack>
  ),
};
