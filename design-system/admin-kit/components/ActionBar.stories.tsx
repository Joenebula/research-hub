import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { ActionBar } from '@/components/ak/core';
import { Button } from '@/components/ak/core';

const meta: Meta<typeof ActionBar> = {
  title: 'Admin/ActionBar',
  component: ActionBar,
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <ActionBar>
      <Button>Cancel</Button>
      <Button variant="primary">Create event</Button>
    </ActionBar>
  ),
};
export const WithStatus: Story = {
  render: () => (
    <ActionBar status="Saved 14:02">
      <Button>Cancel</Button>
      <Button variant="primary">Save changes</Button>
    </ActionBar>
  ),
};
