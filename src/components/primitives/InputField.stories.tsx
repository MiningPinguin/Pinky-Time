import type { Meta, StoryObj } from '@storybook/react';
import { InputField } from './InputField';

const meta: Meta<typeof InputField> = { title: 'Primitives/InputField', component: InputField };
export default meta;
type Story = StoryObj<typeof InputField>;

export const Default: Story = { args: { label: 'Email', value: '', onChangeText: () => {} } };
export const WithPlaceholder: Story = {
  args: { label: 'Email', value: '', onChangeText: () => {}, placeholder: 'you@example.com' },
};
export const WithValue: Story = {
  args: { label: 'Email', value: 'niels@ucll.be', onChangeText: () => {} },
};
export const Password: Story = {
  args: { label: 'Password', value: '', onChangeText: () => {}, secureTextEntry: true },
};
export const WithError: Story = {
  args: { label: 'Email', value: 'invalid', onChangeText: () => {}, error: 'Enter a valid email' },
};
export const WithLabelSettings: Story = {
  args: { label: 'Email', value: '', onChangeText: () => {}, labelTextProps: { size: 'md', weight: 'bold', color: 'text-gray-900' } },
};
export const WithErrorSettings: Story = {
  args: { label: 'Email', value: 'invalid', onChangeText: () => {}, error: 'Enter a valid email', errorTextProps: { weight: 'bold' } },
};
