import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { ButtonLink } from '@/components/ak/core';
import { ArrowLeft, Plus } from 'lucide-react';

const meta: Meta<typeof ButtonLink> = {
  title: 'Admin/ButtonLink',
  component: ButtonLink,
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Variants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, alignItems: 'center' }}>
      <ButtonLink href="/admin/events/new" variant="primary" icon={Plus}>
        New event
      </ButtonLink>
      <ButtonLink href="/admin/events">Cancel</ButtonLink>
      <ButtonLink href="/admin/events" variant="ghost" icon={ArrowLeft}>
        Back to events
      </ButtonLink>
    </div>
  ),
};
