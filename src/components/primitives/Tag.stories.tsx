import type { Meta, StoryObj } from '@storybook/react';
import { Row } from './Row';
import { Tag } from './Tag';

const meta: Meta<typeof Tag> = { title: 'Primitives/Tag', component: Tag };
export default meta;
type Story = StoryObj<typeof Tag>;

export const Default: Story = { args: { label: 'React Native' } };
export const WithRemove: Story = { args: { label: 'Removable', onRemove: () => {} } };
export const CustomLabel: Story = {
  args: { label: 'Styled label', labelTextProps: { weight: 'bold', color: 'text-blue-600' } },
};
export const CustomRemove: Story = {
  args: { label: 'Styled remove', onRemove: () => {}, removeTextProps: { weight: 'bold', color: 'text-red-500' } },
};
export const MultipleTags: Story = {
  render: () => (
    <Row gap="sm" wrap>
      <Tag label="React Native" />
      <Tag label="Expo" />
      <Tag label="NativeWind" onRemove={() => {}} />
    </Row>
  ),
};
