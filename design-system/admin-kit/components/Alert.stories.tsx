import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Alert } from '@/components/ak/core';
import { Button } from '@/components/ak/core';

const meta: Meta<typeof Alert> = {
  title: 'Admin/Alert',
  component: Alert,
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Tones: Story = {
  render: () => (
    <div className="ak-stack">
      <Alert tone="info" title="Checking">
        An info Alert: something to know about this page.
      </Alert>
      <Alert tone="success" title="Advert saved">
        A success Alert, as shown after a save.
      </Alert>
      <Alert tone="warning" title="A rule with no consequence is a suggestion">
        A warning Alert: a known, ongoing problem on this page.
      </Alert>
      <Alert tone="danger" title="Payments are paused">
        A danger Alert: something is broken right now.
      </Alert>
    </div>
  ),
};
export const WithAction: Story = {
  render: () => (
    <Alert tone="warning" title="3 feeds failed" action={<Button size="sm">Open feeds</Button>}>
      The last run could not reach them.
    </Alert>
  ),
};
