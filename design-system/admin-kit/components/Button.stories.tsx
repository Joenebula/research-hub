import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Button } from '@/components/ak/core';
import { Plus, Trash2 } from 'lucide-react';

const meta: Meta<typeof Button> = {
  title: 'Admin/Button',
  component: Button,
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Variants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, alignItems: 'center' }}>
      <Button variant="primary">Save changes</Button>
      <Button>Cancel</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="danger">Delete</Button>
    </div>
  ),
};
export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, alignItems: 'center' }}>
      <Button size="sm">Small</Button>
      <Button>Medium</Button>
      <Button size="lg">Large</Button>
    </div>
  ),
};
export const WithIcon: Story = {
  render: () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, alignItems: 'center' }}>
      <Button variant="primary" icon={Plus}>
        New event
      </Button>
      <Button variant="danger" icon={Trash2}>
        Delete event
      </Button>
    </div>
  ),
};
export const Loading: Story = {
  render: () => (
    <Button variant="primary" loading>
      Saving
    </Button>
  ),
};
export const Disabled: Story = { render: () => <Button disabled>Cancel</Button> };
export const Block: Story = {
  render: () => (
    <Button variant="primary" block>
      Save changes
    </Button>
  ),
};
