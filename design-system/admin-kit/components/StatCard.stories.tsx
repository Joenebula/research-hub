import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { StatCard } from '@/components/ak/core';

const meta: Meta<typeof StatCard> = {
  title: 'Admin/StatCard',
  component: StatCard,
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Row: Story = {
  render: () => (
    <div className="ak-stats">
      <StatCard label="Waiting for you" value={3} tone="danger" hint="Use the bell to see what." />
      <StatCard label="Nights this week" value={24} hint="Published, next 7 days." />
      <StatCard label="Adverts live" value={5} hint="Showing on the site now." />
      <StatCard label="Money this month" value="£410.00" hint="Paid adverts, less refunds." />
    </div>
  ),
};
export const AsLink: Story = {
  render: () => (
    <StatCard label="Claims waiting" value={2} href="/admin/claims" hint="Open the queue." />
  ),
};
