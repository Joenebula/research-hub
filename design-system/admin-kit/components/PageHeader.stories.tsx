import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { PageHeader } from '@/components/ak/core';
import { Button } from '@/components/ak/core';

const meta: Meta<typeof PageHeader> = {
  title: 'Admin/PageHeader',
  component: PageHeader,
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <PageHeader
      eyebrow="Listings"
      title="Events"
      description="Every night on the site, from the feeds and by hand."
      actions={<Button variant="primary">New event</Button>}
    />
  ),
};
export const TitleOnly: Story = { render: () => <PageHeader title="Design kit" /> };
