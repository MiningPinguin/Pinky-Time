import type { Meta, StoryObj } from '@storybook/react';
import { Stack } from './Stack';
import { Text } from './Text';

const meta: Meta<typeof Stack> = { title: 'Primitives/Stack', component: Stack };
export default meta;
type Story = StoryObj<typeof Stack>;

export const Default: Story = {
  args: {
    children: (
      <>
        <Text>Item 1</Text>
        <Text>Item 2</Text>
        <Text>Item 3</Text>
      </>
    ),
    gap: 'md',
  },
};

export const Centered: Story = {
  args: {
    children: (
      <>
        <Text>Centered A</Text>
        <Text>Centered B</Text>
      </>
    ),
    align: 'center',
    gap: 'sm',
  },
};

export const Padded: Story = {
  args: {
    children: (
      <>
        <Text>Item 1</Text>
        <Text>Item 2</Text>
      </>
    ),
    padding: 'md',
  },
};

export const PaddedLG: Story = {
  args: {
    children: (
      <>
        <Text>Padded item 1</Text>
        <Text>Padded item 2</Text>
      </>
    ),
    padding: 'lg',
    gap: 'sm',
  },
};

export const JustifyBetween: Story = {
  args: {
    children: (
      <>
        <Text>Top</Text>
        <Text>Bottom</Text>
      </>
    ),
    justify: 'space-between',
  },
};

export const AlignFlexStart: Story = {
  args: {
    children: (
      <>
        <Text>Start</Text>
        <Text>Items</Text>
      </>
    ),
    align: 'flex-start',
    gap: 'sm',
  },
};

export const WithFlex: Story = {
  args: {
    children: (
      <Stack align="center" justify="center">
        <Text>Flex 1 stack</Text>
      </Stack>
    ),
    flex: 1,
  },
};
