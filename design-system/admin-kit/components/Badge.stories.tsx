import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Badge } from '@/components/ak/core';

const meta: Meta<typeof Badge> = {
  title: 'Admin/Badge',
  component: Badge,
};

export default meta;
type Story = StoryObj<typeof meta>;

/** Colour by meaning (D-073): waiting = warning, done = success, refused = danger. */
export const Tones: Story = {
  render: () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, alignItems: 'center' }}>
      <Badge tone="success" dot>
        On the site
      </Badge>
      <Badge tone="warning" dot>
        Waiting for payment
      </Badge>
      <Badge tone="danger" dot>
        Rejected
      </Badge>
      <Badge tone="info" dot>
        Checking
      </Badge>
      <Badge dot>Draft</Badge>
    </div>
  ),
};
export const WithoutDot: Story = {
  render: () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, alignItems: 'center' }}>
      <Badge tone="success">On the site</Badge>
      <Badge>Draft</Badge>
    </div>
  ),
};
