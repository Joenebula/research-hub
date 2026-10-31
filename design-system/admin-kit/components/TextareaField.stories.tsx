import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { TextareaField } from '@/components/ak/forms';

const meta: Meta<typeof TextareaField> = {
  title: 'Admin/TextareaField',
  component: TextareaField,
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <TextareaField id="sb-about" label="About the night" required hint="One or two sentences." />
  ),
};
export const WithError: Story = {
  render: () => (
    <TextareaField
      id="sb-about-err"
      label="About the night"
      required
      error="Describe the night in 20 characters or more"
    />
  ),
};
