import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { ErrorState } from '@/components/ak/core';
import { Lock, TriangleAlert } from 'lucide-react';
import { Button } from '@/components/ak/core';

const meta: Meta<typeof ErrorState> = {
  title: 'Admin/ErrorState',
  component: ErrorState,
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Danger: Story = {
  render: () => (
    <ErrorState
      title="Events couldn’t be loaded"
      description="The database did not answer. Nothing you have saved is affected."
      code="Error: connection timed out"
      actions={<Button variant="primary">Try again</Button>}
    />
  ),
};
export const NoAccess: Story = {
  render: () => (
    <ErrorState
      tone="neutral"
      icon={Lock}
      title="You don’t have access to Payments"
      description="Ask an admin to add you."
    />
  ),
};
export const Compact: Story = {
  render: () => (
    <ErrorState compact icon={TriangleAlert} title="Checks couldn’t be loaded" code="Error 500" />
  ),
};
