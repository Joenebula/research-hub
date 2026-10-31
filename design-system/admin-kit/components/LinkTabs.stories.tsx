import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { LinkTabs } from '@/components/ak/core';

const meta: Meta<typeof LinkTabs> = {
  title: 'Admin/LinkTabs',
  component: LinkTabs,
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Line: Story = {
  render: () => (
    <LinkTabs
      label="Event screens"
      items={[
        { href: '/admin/events', label: 'Overview', current: true },
        { href: '/admin/events?tab=detail', label: 'Detail', current: false },
        { href: '/admin/events?tab=history', label: 'History', current: false },
      ]}
    />
  ),
};
export const Pill: Story = {
  render: () => (
    <LinkTabs
      label="Time window"
      variant="pill"
      items={[
        { href: '/admin/events?days=7', label: 'Last 7 days', current: false },
        { href: '/admin/events', label: 'Last 30 days', current: true },
        { href: '/admin/events?days=90', label: 'Last 90 days', current: false },
      ]}
    />
  ),
};
