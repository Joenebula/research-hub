import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { IconButton } from '@/components/ak/core';
import { Pencil, Trash2 } from 'lucide-react';

const meta: Meta<typeof IconButton> = {
  title: 'Admin/IconButton',
  component: IconButton,
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <IconButton icon={Pencil} label="Edit this night" />,
};
export const Outline: Story = {
  render: () => <IconButton icon={Trash2} label="Delete this night" outline />,
};
export const Small: Story = {
  render: () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, alignItems: 'center' }}>
      <IconButton icon={Pencil} label="Edit" size="sm" />
      <IconButton icon={Trash2} label="Delete" size="sm" outline />
    </div>
  ),
};
