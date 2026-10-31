import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Page } from '@/components/ak/core';
import { Card } from '@/components/ak/core';

const meta: Meta<typeof Page> = {
  title: 'Admin/Page',
  component: Page,
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Page>
      <Card title="First card">
        <p className="ak-text">Cards in reading order.</p>
      </Card>
      <Card title="Second card">
        <p className="ak-text">The page spaces them.</p>
      </Card>
    </Page>
  ),
};
/** An edit page: the cards sit in one form. */
export const AsForm: Story = {
  render: () => (
    <Page form>
      <Card title="Basics">
        <p className="ak-text">The fields of the record.</p>
      </Card>
    </Page>
  ),
};
