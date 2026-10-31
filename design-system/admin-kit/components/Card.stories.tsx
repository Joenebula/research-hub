import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Card } from '@/components/ak/core';
import { Button } from '@/components/ak/core';

const meta: Meta<typeof Card> = {
  title: 'Admin/Card',
  component: Card,
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Card title="Basics" subtitle="What the night is called and where it is">
      <p className="ak-text">Body text in a card. Spacing comes from the scale.</p>
    </Card>
  ),
};
export const WithActionsAndFooter: Story = {
  render: () => (
    <Card
      title="Line-up"
      actions={<Button size="sm">Add artist</Button>}
      footer={<span className="ak-text ak-text--muted">Three artists</span>}
    >
      <p className="ak-text">The artists playing this night, in running order.</p>
    </Card>
  ),
};
export const NoPadding: Story = {
  render: () => (
    <Card title="Events" padding="none">
      <ul className="ak-rows__list" aria-label="Events">
        <li className="ak-rows__item">Friday Night Jazz</li>
        <li className="ak-rows__item">Dub Session</li>
      </ul>
    </Card>
  ),
};
