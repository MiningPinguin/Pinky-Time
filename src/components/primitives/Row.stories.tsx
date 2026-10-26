import type { Meta, StoryObj } from '@storybook/react';
import { Row } from './Row';
import { Text } from './Text';
import { Stack } from './Stack';

const meta: Meta<typeof Row> = { title: 'Primitives/Row', component: Row };
export default meta;
type Story = StoryObj<typeof Row>;

const content = (label: string) => (
  <>
    <Text>{label} 1</Text>
    <Text>{label} 2</Text>
  </>
);

export const Default: Story = {
  args: {
    children: (
      <>
        <Text>Left</Text>
        <Text>Right</Text>
      </>
    ),
    gap: 'md',
    justify: 'space-between',
  },
};
export const GapSM: Story = { args: { children: content('Gap sm'), gap: 'sm' } };
export const GapMD: Story = { args: { children: content('Gap md'), gap: 'md' } };
export const GapLG: Story = { args: { children: content('Gap lg'), gap: 'lg' } };
export const AlignFlexStart: Story = { args: { children: content('Start aligned'), align: 'flex-start' } };
export const AlignCenter: Story = { args: { children: <Text>Centered</Text>, align: 'center' } };
export const AlignFlexEnd: Story = { args: { children: <Text>End aligned</Text>, align: 'flex-end' } };
export const AlignStretch: Story = { args: { children: <Text>Stretched</Text>, align: 'stretch' } };
export const JustifyCenter: Story = { args: { children: <Text>Justify center</Text>, justify: 'center' } };
export const JustifyFlexEnd: Story = { args: { children: <Text>Justify end</Text>, justify: 'flex-end' } };
export const Wrap: Story = {
  args: {
    children: (
      <>
        <Text>First</Text>
        <Text>Second</Text>
        <Text>Third</Text>
        <Text>Fourth</Text>
        <Text>Fifth</Text>
      </>
    ),
    wrap: true,
    gap: 'sm',
  },
};
export const AllGaps: Story = {
  render: () => (
    <Stack gap="sm">
      <Row gap="none"><Text>None</Text><Text>gaps</Text></Row>
      <Row gap="sm"><Text>Small</Text><Text>gaps</Text></Row>
      <Row gap="md"><Text>Medium</Text><Text>gaps</Text></Row>
      <Row gap="lg"><Text>Large</Text><Text>gaps</Text></Row>
    </Stack>
  ),
};
