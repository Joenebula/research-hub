import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { EmptyState } from '@/components/ak/core';
import { CalendarDays, Plus } from 'lucide-react';
import { Button } from '@/components/ak/core';

const meta: Meta<typeof EmptyState> = {
  title: 'Admin/EmptyState',
  component: EmptyState,
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <EmptyState
      icon={CalendarDays}
      title="No events yet"
      description="Nights arrive from the feeds, or you can add one by hand."
      actions={
        <Button variant="primary" icon={Plus}>
          New event
        </Button>
      }
    />
  ),
};
