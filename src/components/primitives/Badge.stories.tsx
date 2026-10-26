import type { Meta, StoryObj } from '@storybook/react';
import { Badge } from './Badge';
import { Row } from './Row';

const meta: Meta<typeof Badge> = { title: 'Primitives/Badge', component: Badge };
export default meta;
type Story = StoryObj<typeof Badge>;

export const Default: Story = { args: { label: 'Default' } };
export const Success: Story = { args: { label: 'Success', variant: 'success' } };
export const Warning: Story = { args: { label: 'Warning', variant: 'warning' } };
export const ErrorVariant: Story = { args: { label: 'Error', variant: 'error' } };
export const AllVariants: Story = {
  render: () => (
    <Row gap="sm">
      <Badge label="Default" />
      <Badge label="Success" variant="success" />
      <Badge label="Warning" variant="warning" />
      <Badge label="Error" variant="error" />
    </Row>
  ),
};
export const AllVariantsLarge: Story = {
  render: () => (
    <Row gap="sm">
      <Badge label="Default" labelTextProps={{ weight: 'bold' }} />
      <Badge label="Success" variant="success" labelTextProps={{ weight: 'bold' }} />
      <Badge label="Warning" variant="warning" labelTextProps={{ weight: 'bold' }} />
      <Badge label="Error" variant="error" labelTextProps={{ weight: 'bold' }} />
    </Row>
  ),
};
