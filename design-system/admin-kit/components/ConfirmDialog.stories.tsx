import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { ConfirmDialog } from '@/components/ak/client';
import { Trash2 } from 'lucide-react';
import { Button } from '@/components/ak/core';

const meta: Meta<typeof ConfirmDialog> = {
  title: 'Admin/ConfirmDialog',
  component: ConfirmDialog,
};

export default meta;
type Story = StoryObj<typeof meta>;

/** Press the button: typing the name unlocks Delete. */
export const Default: Story = {
  render: () => (
    <ConfirmDialog
      title="Delete “Friday Night Jazz”?"
      description="This removes the night from the site for everyone. It cannot be undone."
      consequences={['Its line-up', 'Its poster', 'Any advert promoting it stops']}
      confirmText="Friday Night Jazz"
      confirmLabel="Delete event"
      trigger={(open) => (
        <Button variant="danger" icon={Trash2} onClick={open}>
          Delete event
        </Button>
      )}
    />
  ),
};
