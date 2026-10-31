import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Breadcrumbs } from '@/components/ak/core';

const meta: Meta<typeof Breadcrumbs> = {
  title: 'Admin/Breadcrumbs',
  component: Breadcrumbs,
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Breadcrumbs
      items={[
        { label: 'Listings', href: '/admin' },
        { label: 'Events', href: '/admin/events' },
        { label: 'Friday Night Jazz' },
      ]}
    />
  ),
};
