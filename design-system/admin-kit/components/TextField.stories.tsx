import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { TextField } from '@/components/ak/forms';

const meta: Meta<typeof TextField> = {
  title: 'Admin/TextField',
  component: TextField,
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <TextField
      id="sb-title"
      label="Night’s name"
      required
      placeholder="Friday Night Jazz"
      hint="As it appears on the site."
    />
  ),
};
export const WithError: Story = {
  render: () => (
    <TextField id="sb-title-err" label="Night’s name" required error="Enter the night’s name" />
  ),
};
export const DateTime: Story = {
  render: () => (
    <TextField id="sb-when" type="datetime-local" label="Date and time" required hint="UK time." />
  ),
};
export const Disabled: Story = {
  render: () => (
    <TextField id="sb-dis" label="Night’s name" defaultValue="Friday Night Jazz" disabled />
  ),
};
