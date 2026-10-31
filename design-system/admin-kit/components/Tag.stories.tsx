import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Tag } from '@/components/ak/core';

const meta: Meta<typeof Tag> = {
  title: 'Admin/Tag',
  component: Tag,
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, alignItems: 'center' }}>
      <Tag>Venue</Tag>
      <Tag>Promoter</Tag>
      <Tag>Artist</Tag>
    </div>
  ),
};
